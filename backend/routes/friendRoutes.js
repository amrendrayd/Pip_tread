const express = require('express');
const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest } = require('../controllers/friendController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Auth middleware

router.post('/friend-request/:userId', authMiddleware, sendFriendRequest);
router.post('/accept-friend-request/:userId', authMiddleware, acceptFriendRequest);
router.post('/reject-friend-request/:userId', authMiddleware, rejectFriendRequest);

module.exports = router;
