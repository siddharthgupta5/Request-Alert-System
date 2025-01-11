const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const metricsRoutes = require('./metrics');

router.use('/api', apiRoutes);
router.use('/metrics', metricsRoutes);

module.exports = router;