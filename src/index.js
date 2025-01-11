const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

const server = app.listen(config.app.port, () => {
    console.log(`${config.app.name} running in ${config.app.env} mode on port ${config.app.port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => process.exit(1));
});