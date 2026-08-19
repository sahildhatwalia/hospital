const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticateToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { UserRole } = require('../shared');

router.get('/', departmentController.getDepartments);
router.post('/', authenticateToken, authorizeRoles(UserRole.ADMIN), departmentController.createDepartment);

module.exports = router;
