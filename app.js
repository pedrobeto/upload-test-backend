const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Environment variables access [Useful for deploy]
require('dotenv/config');

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }, () => {
    console.log('🍃 Connected to MongoDB!');
});

// Import routes
const userRouter = require('./src/routes/user.routes');
const verifyToken = require('./src/verifyToken');

app.use('/user', userRouter);

// Listening to the server
app.listen(8000, function() {
    console.log('🚀 Server started on port 8000!');
});



