const Post = require('../models/Post');

// Search posts by title or content
exports.searchPosts = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const posts = await Post.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { content: { $regex: searchQuery, $options: 'i' } }
      ]
    }).populate('userId', 'username');
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};
