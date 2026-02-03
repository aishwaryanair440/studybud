const express = require('express');
const router = express.Router();
const { createSession, getSessions } = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createSession)
    .get(protect, getSessions);

module.exports = router;
