# Request Monitoring System

## Project Description

This Request Monitoring System is a robust, scalable backend solution designed to monitor and track failed POST requests. It features real-time alerting, comprehensive metrics tracking, and efficient request validation. The system is built to handle high-volume traffic while maintaining detailed logs of failed attempts and automatically alerting administrators when security thresholds are breached.

## Features

1. **Request Validation**: Robust validation of POST requests including headers and access tokens.
2. **Real-time Monitoring**: Track failed requests with detailed logging and metrics collection.
3. **Automated Alerting**: Email notifications when failed attempt thresholds are exceeded.
4. **Metrics Dashboard**: Comprehensive metrics endpoint for monitoring and analysis.
5. **Rate Limiting**: Built-in protection against excessive requests.
6. **Scalable Architecture**: Designed to handle approximately 500 requests per second.


## Tech Stacks:

-   Backend: Node.js + Express
-   Database: MongoDB
-   Email Notifications: Nodemailer with Gmail SMTP
-   Rate Limiting: express-rate-limit
-   Monitoring: Custom metrics aggregation

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/request-monitoring-system.git
   cd request-monitoring-system
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Gmail for Notifications:**
-   Enable 2-Step Verification in your Google Account
-   Generate App Password for mail
-   Copy the 16-character password for .env file 

4. **Create a .env file(optional):**
   ```js
   PORT=3000
   NODE_ENV=development
   MONGO_URI=your_database_cluster
   EMAIL_FROM=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ALERT_EMAIL_TO=recipient@example.com
   VALID_ACCESS_TOKEN=your-secure-access-token
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open another terminal:**
   ```bash
   npm start
   ```

   

   




