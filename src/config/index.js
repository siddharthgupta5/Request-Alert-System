require('dotenv').config();

const config = {
    app: {
        name: 'Request Monitoring System',
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development'
    },
    db: {
        uri: process.env.MONGO_URI,
    },
    monitoring: {
        timeWindowMinutes: 10,
        maxFailedAttempts: 5
    },
    email: {
        from: process.env.EMAIL_FROM,
        password: process.env.EMAIL_PASSWORD,
        to: process.env.ALERT_EMAIL_TO
    },
    security: {
        validAccessToken: process.env.VALID_ACCESS_TOKEN
    }
};

module.exports = config;
