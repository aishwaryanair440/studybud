const Session = require('../models/Session');

// @desc    Add new session
// @route   POST /api/sessions
// @access  Private
exports.createSession = async (req, res) => {
    try {
        const { startTime, endTime, duration, type, focusScore, pauses, tabSwitches, idleTime } = req.body;

        const session = await Session.create({
            user: req.user._id,
            startTime,
            endTime,
            duration,
            type,
            focusScore,
            pauses,
            tabSwitches,
            idleTime
        });

        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user sessions
// @route   GET /api/sessions
// @access  Private
exports.getSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user._id }).sort({ startTime: -1 });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
