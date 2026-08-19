const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { authenticateToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { UserRole } = require('../shared');

router.get('/', doctorController.getDoctors);
router.get('/me', authenticateToken, doctorController.getDoctorMe);
router.post('/', authenticateToken, authorizeRoles(UserRole.ADMIN), doctorController.createDoctor);
router.patch('/:id/status', authenticateToken, authorizeRoles(UserRole.DOCTOR, UserRole.ADMIN), doctorController.updateDoctorStatus);

module.exports = router;

