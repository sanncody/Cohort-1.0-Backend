const express = require('express');
const { createPost } = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', 
    authMiddleware, /* req.user = [logged in userData] which can be used in controller  */
    createPost);

module.exports = router;