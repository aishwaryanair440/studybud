const express = require('express');
const router = express.Router();
const { getDailyStats, getWeeklyStats, getMonthlyStats } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/daily', protect, getDailyStats);
router.get('/weekly', protect, getWeeklyStats);
router.get('/monthly', protect, getMonthlyStats);

module.exports = router;
