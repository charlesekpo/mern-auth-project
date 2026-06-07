const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes.js');

const app = express();

app.use(express.json());

// this will enable me read cookie sent from client browser
app.use(cookieParser());

app.use(cors({
    // considering react frontend requests
    origin: "http://localhost:5173",

    // attach credentials like token
    credentials: true
}));

app.use('/api/auth', authRoutes);

module.exports = app;