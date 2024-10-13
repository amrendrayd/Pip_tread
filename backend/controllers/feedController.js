const Post = require('../models/Post');
const User = require('../models/User');

// Get Friends' Posts
const getFeed = async (req, res) => {
    const user = await User.findById(req.user.id).populate('friends');
    const friendIds = user.friends.map(friend => friend._id);

    const posts = await Post.find({ author: { $in: friendIds } });
    res.status(200).json(posts);
};

// Get Non-Friends' Posts where Friends Commented
const getFriendsCommentsFeed = async (req, res) => {
    const user = await User.findById(req.user.id).populate('friends');
    const friendIds = user.friends.map(friend => friend._id);

    const postsWithFriendsComments = await Post.find({ 'comments.author': { $in: friendIds } });
    res.status(200).json(postsWithFriendsComments);
};

module.exports = { getFeed, getFriendsCommentsFeed };
