const Post = require('../models/Post');

// Create Post
const createPost = async (req, res) => {
  const { text } = req.body;
  const post = new Post({ text, author: req.user.id });
  await post.save();
  res.status(201).json(post);
};

// Add Comment to Post
const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  post.comments.push({ text, author: req.user.id });
  await post.save();
  res.status(201).json(post);
};

module.exports = { createPost, addComment };
