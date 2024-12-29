const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET; 


router.post('/register', async (req, res) => {
    try {
        console.log('Request received:', req.body); 
        const { name, email, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            console.log('Missing fields in request'); 
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 8) {
            console.log('Password too short');
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        console.log('Checking if username already exists');
        const existingUserByName = await User.findOne({ name });
        if (existingUserByName) {
            console.log('Username already exists:', name);
            return res.status(400).json({ message: 'Username already in use' });
        }

        console.log('Checking if email already exists');
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            console.log('Email already exists:', email);
            return res.status(400).json({ message: 'Email already in use' });
        }

        console.log('Hashing password');
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Creating new user');
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error occurred:', err); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        console.log('Request received:', req.body); // Debug request body
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            console.log('Missing fields in request');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        console.log('Checking if user exists');
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found with email:', email);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log('Verifying password');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password for email:', email);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log('Generating JWT token');
        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        console.log('Login successful');
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (err) {
        console.error('Error occurred:', err); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;