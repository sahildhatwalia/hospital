const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');
const validate = require('../middleware/validate');
const { generateTokenSchema } = require('../validators/tokenSchemas');
const { authenticateToken } = require('../middleware/auth');
const roles = require('../middleware/roles');

router.post('/generate', validate(generateTokenSchema), tokenController.generateToken);
router.post('/call-next', authenticateToken, roles(['DOCTOR', 'ADMIN']), tokenController.callNextToken);
router.patch('/:id/complete', authenticateToken, roles(['DOCTOR', 'ADMIN']), tokenController.completeToken);
router.patch('/:id/skip', authenticateToken, roles(['DOCTOR', 'ADMIN']), tokenController.skipToken);
router.post('/:id/emergency-bump', authenticateToken, roles(['RECEPTIONIST', 'ADMIN']), tokenController.emergencyBumpToken);

module.exports = router;
