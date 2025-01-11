const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes');
const rateLimiter = require('./middleware/rateLimiter');
const logger = require('./utils/logger');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: config.app.env === 'development' ? err.message : undefined
    });
});

module.exports = app;