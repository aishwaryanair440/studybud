const Session = require('../models/Session');
const mongoose = require('mongoose');

// @desc    Get daily stats
// @route   GET /api/stats/daily
// @access  Private
exports.getDailyStats = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const stats = await Session.aggregate([
            {
                $match: {
                    user: req.user._id,
                    startTime: { $gte: startOfDay },
                    type: 'focus'
                }
            },
            {
                $group: {
                    _id: null,
                    totalDuration: { $sum: '$duration' },
                    avgFocusScore: { $avg: '$focusScore' },
                    sessionCount: { $sum: 1 }
                }
            }
        ]);

        res.json(stats[0] || { totalDuration: 0, avgFocusScore: 0, sessionCount: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get weekly stats
// @route   GET /api/stats/weekly
// @access  Private
exports.getWeeklyStats = async (req, res) => {
    try {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - 7);

        const stats = await Session.aggregate([
            {
                $match: {
                    user: req.user._id,
                    startTime: { $gte: startOfWeek },
                    type: 'focus'
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
                    totalDuration: { $sum: "$duration" },
                    avgFocusScore: { $avg: "$focusScore" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get monthly stats
// @route   GET /api/stats/monthly
// @access  Private
exports.getMonthlyStats = async (req, res) => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setMonth(startOfMonth.getMonth() - 1);

        const stats = await Session.aggregate([
            {
                $match: {
                    user: req.user._id,
                    startTime: { $gte: startOfMonth },
                    type: 'focus'
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$startTime" } },
                    totalDuration: { $sum: "$duration" },
                    avgFocusScore: { $avg: "$focusScore" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
