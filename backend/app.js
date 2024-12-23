const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Adjust path to your auth routes
const connectDb = require('./db')
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express();

// Middleware
app.use(express.json());
// Database connection
connectDb()
app.use(bodyParser.json());
app.use(cors());
// Routes
app.use('/api/auth', authRoutes); // Ensure this prefix matches your Postman request

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
