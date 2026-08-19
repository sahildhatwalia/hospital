const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');
const { authenticateToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { UserRole } = require('../shared');

router.post('/generate', authenticateToken, tokenController.createToken);
router.post('/call-next', authenticateToken, authorizeRoles(UserRole.DOCTOR, UserRole.RECEPTIONIST, UserRole.ADMIN), tokenController.callNext);
router.patch('/:tokenId/complete', authenticateToken, authorizeRoles(UserRole.DOCTOR, UserRole.RECEPTIONIST, UserRole.ADMIN), tokenController.completeToken);
router.patch('/:tokenId/skip', authenticateToken, authorizeRoles(UserRole.DOCTOR, UserRole.RECEPTIONIST, UserRole.ADMIN), tokenController.skipToken);
router.patch('/:tokenId/cancel', authenticateToken, tokenController.cancelToken);
router.get('/my-tokens', authenticateToken, tokenController.getMyTokens);

module.exports = router;

