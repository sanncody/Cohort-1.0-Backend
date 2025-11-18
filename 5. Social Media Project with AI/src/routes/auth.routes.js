const express = require('express');

const { registerController, loginController } = require('../controllers/auth.controller');

const router = express.Router();

/**
 * POST /api/register
 * POST /api/login
 * GET /api/user [protected]
 * 
 * POST /api/posts { image_file } [PROTECTED]
 */

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;