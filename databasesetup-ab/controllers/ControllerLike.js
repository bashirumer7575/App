const Like = require('../models/Like');

// Create a Like
exports.createLike = async (req, res) => {
    try {
        const like = new Like(req.body);
        await like.save();
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a Like by ID
exports.getLike = async (req, res) => {
    try {
        const like = await Like.findById(req.params.id).populate('user').populate('post');
        if (!like) return res.status(404).json({ message: 'Like not found' });
        res.status(200).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Like by ID
exports.deleteLike = async (req, res) => {
    try {
        const like = await Like.findByIdAndDelete(req.params.id);
        if (!like) return res.status(404).json({ message: 'Like not found' });
        res.status(200).json({ message: 'Like deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Likes for a specific Post
exports.getLikesByPost = async (req, res) => {
    try {
        const likes = await Like.find({ postId: req.params.postId });
        res.status(200).json(likes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Count the number of Likes for a specific Post
exports.countLikesForPost = async (req, res) => {
    try {
        const likeCount = await Like.countDocuments({ postId: req.params.postId });
        res.status(200).json({ likeCount });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
