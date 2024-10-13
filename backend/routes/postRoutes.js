const express = require('express');
const { createPost, addComment } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/post', authMiddleware, createPost);
router.post('/post/:postId/comment', authMiddleware, addComment);

module.exports = router;
