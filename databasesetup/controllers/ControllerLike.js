const Like = require('../models/Like');
const Post = require('../models/Post');

// Controller actions for like
exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body;  // Ensure you get the `post` and `user` from the request body
        const like = new Like({ post, user });
        await like.save();

        // Increment the like count for the post
        await Post.findByIdAndUpdate(post, { $inc: { likes: 1 } });

        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const like = await Like.findByIdAndDelete(req.params.id);  // Delete like by ID
        if (!like) return res.status(404).json({ message: 'Like not found' });

        // Decrement the like count for the post
        await Post.findByIdAndUpdate(like.post, { $inc: { likes: -1 } });

        res.status(200).json({ message: 'Like removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
