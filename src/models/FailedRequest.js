const mongoose = require('mongoose');

const failedRequestSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
        index: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    },
    reason: {
        type: String,
        required: true
    },
    headers: {
        type: Object
    },
    path: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('FailedRequest', failedRequestSchema);