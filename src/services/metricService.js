const FailedRequest = require('../models/FailedRequest');
const logger = require('../utils/logger');

class MetricService {
    async getFailedRequestMetrics(timeRange = 24) {
        try {
            const metrics = await FailedRequest.aggregate([
                {
                    $match: {
                        timestamp: {
                            $gte: new Date(Date.now() - timeRange * 60 * 60 * 1000)
                        }
                    }
                },
                {
                    $group: {
                        _id: '$ip',
                        totalFailures: { $sum: 1 },
                        lastFailure: { $max: '$timestamp' },
                        reasons: { $addToSet: '$reason' },
                        firstFailure: { $min: '$timestamp' }
                    }
                },
                {
                    $sort: { totalFailures: -1 }
                }
            ]);

            return metrics;
        } catch (error) {
            console.error('Error fetching metrics:', error);
            throw error;
        }
    }

    async getHourlyFailureRate(hours = 24) {
        try {
            return await FailedRequest.aggregate([
                {
                    $match: {
                        timestamp: {
                            $gte: new Date(Date.now() - hours * 60 * 60 * 1000)
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            hour: { $hour: '$timestamp' },
                            day: { $dayOfMonth: '$timestamp' },
                            month: { $month: '$timestamp' },
                            year: { $year: '$timestamp' }
                        },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        '_id.year': 1,
                        '_id.month': 1,
                        '_id.day': 1,
                        '_id.hour': 1
                    }
                }
            ]);
        } catch (error) {
            console.error('Error fetching hourly failure rate:', error);
            throw error;
        }
    }
}

module.exports = new MetricService();
