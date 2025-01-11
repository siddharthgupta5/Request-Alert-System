const FailedRequest = require('../models/FailedRequest');
const emailService = require('../services/emailService');
const config = require('../config');
const logger = require('../utils/logger');
const { validateHeaders } = require('../utils/validators');

class RequestValidator {
    async validateRequest(req, res, next) {
        try {
            const accessToken = req.headers['x-access-token'];
            const ip = req.ip;

            // Validate access token
            if (!accessToken || accessToken !== config.security.validAccessToken) {
                await this.handleFailedRequest(req, 'Invalid access token');
                return res.status(401).json({ error: 'Invalid access token' });
            }

            // Validate required headers
            const headerValidation = validateHeaders(req.headers);
            if (!headerValidation.isValid) {
                await this.handleFailedRequest(req, headerValidation.error);
                return res.status(400).json({ error: headerValidation.error });
            }

            next();
        } catch (error) {
            console.error('Error in request validation:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async handleFailedRequest(req, reason) {
        try {
            const ip = req.ip;
            
            // Log failed request
            await FailedRequest.create({
                ip,
                reason,
                headers: req.headers,
                path: req.path
            });

            // Check for threshold breach
            const timeWindow = config.monitoring.timeWindowMinutes;
            const threshold = config.monitoring.maxFailedAttempts;
            
            const failedAttempts = await FailedRequest.countDocuments({
                ip,
                timestamp: { 
                    $gte: new Date(Date.now() - timeWindow * 60 * 1000) 
                }
            });

            if (failedAttempts >= threshold) {
                await emailService.sendAlert(ip, failedAttempts, timeWindow);
            }
        } catch (error) {
            console.error('Error handling failed request:', error);
        }
    }
}

module.exports = new RequestValidator();