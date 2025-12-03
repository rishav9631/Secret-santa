import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://rishavjha771:8qRIAVWwFDFzWlTq@cluster0.tzjm4zy.mongodb.net/secret-santa?appName=Cluster0";

const USERS = [
    { name: "Aarti", username: "aartiye", password: "q5cePpMW" },
    { name: "Aashish", username: "aashissa", password: "GY5NR6au" },
    { name: "Abhy", username: "asarkar", password: "jZR4sCnV" },
    { name: "Aditya", username: "adideshm", password: "IwWyq1hd" },
    { name: "Pranali", username: "pranalbh", password: "uSqcIlB0" },
    { name: "Vishal", username: "vishjaga", password: "dtU6tV92" },
    { name: "Mohammed", username: "mujeebm", password: "mrRtrRld" },
    { name: "Pyush", username: "pyushv", password: "736iDOrz" },
    { name: "Manali", username: "manalisu", password: "fyPU5HkU" },
    { name: "Anuja", username: "anujkula", password: "6JjZaU65" },
    { name: "Ajay", username: "ajavaita", password: "OB3gqYVj" },
    { name: "Aniket", username: "anikadam", password: "Vu4s6Kfc" },
    { name: "Rishav", username: "kumrisha", password: "61nUo5qX" },
    { name: "Vivek", username: "vivekar", password: "pKLgqFfX" },
    { name: "Shakti", username: "shaktim", password: "o4JyRLSO" },
    { name: "Varsha", username: "varshapa", password: "cDPGoPWa" },
    { name: "Rohit", username: "rohidhad", password: "wJeWJF1H" },
    { name: "Ismail", username: "ismailsa", password: "FxLdvKtR" },
    { name: "Nilam", username: "nilamp", password: "fXH9Eksx" },
    { name: "Parul", username: "paruls", password: "Th1zJccE" },
    { name: "Sonal", username: "sonalmar", password: "omBC4a7p" },
    { name: "Aarti", username: "aratirol", password: "PGAEuQzc" },
    { name: "Shubhada", username: "ruikars", password: "7JWqmzl8" },
    { name: "Shubhangi", username: "joshshub", password: "CyVIBvjt" },
    { name: "Rohit", username: "rohtik6", password: "TB3RpCTF" },
    { name: "Prashant", username: "patilpra", password: "aacG2JTx" },
    { name: "Prasad", username: "prasadha", password: "yTVkexzV" },
    { name: "Poonam", username: "poonamja", password: "qvAXoF1q" },
    { name: "Kajal", username: "kajalma", password: "XmpqaOru" },
    { name: "Beauty", username: "beautyb", password: "gseUOIR0" },
    { name: "Gopal", username: "gopaly", password: "8uVvkZAy" },
    { name: "Harshad", username: "harshsol", password: "ASnzgqLf" },
    { name: "Himanshu", username: "goundh", password: "HUivAgig" },
    { name: "Kingshuk", username: "kisaha", password: "iACDJmpB" },
    { name: "Prerana", username: "preranaro", password: "t3epwcdJ" },
    { name: "Sakshi", username: "sakshtha", password: "y4wzKv3S" }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing users to avoid duplicates
        await User.deleteMany({});
        console.log('Cleared existing users');

        // Insert new users
        await User.insertMany(USERS);
        console.log('Successfully seeded users!');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
