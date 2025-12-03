import mongoose from 'mongoose';
import { Assignment } from './models/Assignment.js';

const MONGODB_URI = "mongodb+srv://rishavjha771:8qRIAVWwFDFzWlTq@cluster0.tzjm4zy.mongodb.net/secret-santa?appName=Cluster0";

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB for verification...');

        try {
            const assignments = await Assignment.find().sort({ timestamp: -1 }).limit(5);
            console.log('\n--- Recent Assignments in DB ---');
            if (assignments.length === 0) {
                console.log('No assignments found.');
            } else {
                assignments.forEach(a => {
                    console.log(`Time: ${a.timestamp}`);
                    console.log(`Giver: ${a.giver}`);
                    console.log(`Receiver: ${a.receiver}`);
                    console.log('------------------------');
                });
            }
        } catch (err) {
            console.error('Error fetching assignments:', err);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch((err) => console.error('MongoDB connection error:', err));
