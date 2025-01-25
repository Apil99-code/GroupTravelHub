const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); 
const connectDb = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const { Server } = require('socket.io');
const { createServer } = require('http');


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Correct frontend origin
        methods: ["GET", "POST"],
        credentials: true,
    },
});



io.on("connection", (socket) => {
    console.log("User connected");
    console.log("Socket ID:", socket.id);
    // socket.emit("Welcome", `Welcome to the group`);
    // socket.broadcast.emit("Welcome", `${socket.id}, joined the server`);
    
    socket.on('message', (data) => {
        console.log("Message received:", data);
        // socket.broadcast.emit("recive-message",data); //for sending message but not showing to ourself
        io.to(data.room).emit("recive-message",data); //socket.on('message', (data) => {
    });

    // On disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


connectDb();


app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
