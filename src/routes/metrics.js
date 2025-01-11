const express = require('express');
const router = express.Router();
const metricService = require('../services/metricService');
const logger = require('../utils/logger');

router.get('/', async (req, res) => {
    try {
        const { timeRange } = req.query;
        const metrics = await metricService.getFailedRequestMetrics(timeRange);
        res.json(metrics);
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'Error fetching metrics' });
    }
});

router.get('/hourly', async (req, res) => {
    try {
        const { hours } = req.query;
        const hourlyMetrics = await metricService.getHourlyFailureRate(hours);
        res.json(hourlyMetrics);
    } catch (error) {
        console.error('Error fetching hourly metrics:', error);
        res.status(500).json({ error: 'Error fetching hourly metrics' });
    }
});

module.exports = router;