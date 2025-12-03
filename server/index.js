import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Assignment } from './models/Assignment.js';
import { User } from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Allow all for now or specific frontend URL
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://rishavjha771:8qRIAVWwFDFzWlTq@cluster0.tzjm4zy.mongodb.net/secret-santa?appName=Cluster0";

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is awake!' });
});

// Routes

// Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ success: true, user: { name: user.name, username: user.username } });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get All Users (for the wheel)
app.get('/api/users', async (req, res) => {
    try {
        // Get list of users who have already been assigned as receivers
        const assignments = await Assignment.find({}, { receiver: 1 });
        const assignedReceivers = assignments.map(a => a.receiver);

        // Find users who are NOT in the assignedReceivers list
        const users = await User.find({
            username: { $nin: assignedReceivers }
        }, { name: 1, username: 1, _id: 0 });

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get Existing Assignment
app.get('/api/assignment/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const assignment = await Assignment.findOne({ giver: username });
        if (assignment) {
            // Find the receiver's full details from the DB
            const receiverUser = await User.findOne({ username: assignment.receiver });
            res.json({
                exists: true,
                assignment: {
                    ...assignment.toObject(),
                    receiverName: receiverUser ? receiverUser.name : assignment.receiver
                }
            });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error fetching assignment:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Store Assignment Route
app.post('/api/assign', async (req, res) => {
    const { giver, receiver } = req.body;

    if (!giver || !receiver) {
        return res.status(400).json({ success: false, message: 'Giver and receiver are required' });
    }

    try {
        const newAssignment = new Assignment({ giver, receiver });
        await newAssignment.save();
        res.json({ success: true, message: 'Assignment saved successfully', assignment: newAssignment });
    } catch (error) {
        console.error('Error saving assignment:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Admin Route - Get All Assignments
app.get('/api/admin/assignments', async (req, res) => {
    try {
        const assignments = await Assignment.find().sort({ timestamp: -1 });

        // Fetch all users to map names efficiently
        const users = await User.find({});
        const userMap = new Map(users.map(u => [u.username, u.name]));

        // Enrich with real names
        const enrichedAssignments = assignments.map(a => {
            return {
                ...a.toObject(),
                giverName: userMap.get(a.giver) || a.giver,
                receiverName: userMap.get(a.receiver) || a.receiver
            };
        });

        res.json(enrichedAssignments);
    } catch (error) {
        console.error('Error fetching admin assignments:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
