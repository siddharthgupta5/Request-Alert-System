const express = require('express');
const router = express.Router();
const requestValidator = require('../middleware/requestValidator');
const logger = require('../utils/logger');

router.post('/submit', requestValidator.validateRequest.bind(requestValidator), (req, res) => {
    try {
        console.log('Successful request processed');
        res.json({ 
            success: true,
            message: 'Request processed successfully'
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;