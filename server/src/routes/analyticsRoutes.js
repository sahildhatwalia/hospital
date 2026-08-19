const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticateToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { UserRole } = require('../shared');

router.get('/summary', authenticateToken, authorizeRoles(UserRole.ADMIN), analyticsController.getAnalyticsSummary);

module.exports = router;
