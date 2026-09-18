const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const { loginSchema, registerSchema } = require('../validators/authSchemas');
const { authenticateToken } = require('../middleware/auth');

router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(registerSchema), authController.register);
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;
