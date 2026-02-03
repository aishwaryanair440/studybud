const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // In minutes
        required: true
    },
    type: {
        type: String,
        enum: ['focus', 'break'],
        default: 'focus'
    },
    focusScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 100
    },
    pauses: {
        type: Number,
        default: 0
    },
    tabSwitches: {
        type: Number,
        default: 0
    },
    idleTime: {
        type: Number, // In seconds
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Session', sessionSchema);
