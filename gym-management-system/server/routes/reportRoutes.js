const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to get monthly revenue report (supports query params or gets all)
router.get('/revenue', reportController.getMonthlyRevenue);

// Route to get all trainer performance
router.get('/trainer', reportController.getTrainerPerformance);

// Route to get specific trainer performance
router.get('/trainer/:trainerId', reportController.getTrainerPerformance);

// Route to get membership report
router.get('/membership', reportController.getMembershipReport);

module.exports = router;