const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

router.get('/:departmentId/live', queueController.getLiveQueue);

module.exports = router;
