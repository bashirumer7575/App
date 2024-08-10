const Like = require('../models/Like');

exports.createLike = async (req, res) => {
    try {
        const like = new Like(req.body);
        await like.save();
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getLike = async (req, res) => {
    try {
        const like = await Like.findById(req.params.id);
        if (!like) return res.status(404).json({ message: 'Like not found' });
        res.status(200).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteLike = async (req, res) => {
    try {
        const like = await Like.findByIdAndDelete(req.params.id);
        if (!like) return res.status(404).json({ message: 'Like not found' });
        res.status(200).json({ message: 'Like deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
