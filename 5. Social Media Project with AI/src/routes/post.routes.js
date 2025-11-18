const express = require('express');
const multer = require('multer');


const { createPost } = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');


const upload = multer({ storage: multer.memoryStorage() });
    

const router = express.Router();

router.post('/', 
    authMiddleware, /* req.user = [logged in userData] which can be used in controller  */
    upload.single('postImg'),
    createPost);

module.exports = router;