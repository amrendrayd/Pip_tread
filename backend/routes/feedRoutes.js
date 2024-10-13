const express = require('express');
const { getFeed, getFriendsCommentsFeed } = require('../controllers/feedController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/feed', authMiddleware, getFeed);
router.get('/feed/friends-comments', authMiddleware, getFriendsCommentsFeed);

module.exports = router;
