// controllers/ControllerFollow.js
const User = require('../models/User');

exports.followUser = async (req, res) => {
    try {
        const { currentUserId, targetUserId } = req.body;

        // Check if both users exist
        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return res.status(404).json({ message: 'User(s) not found' });
        }

        // Check if already following
        if (currentUser.following.includes(targetUserId)) {
            return res.status(400).json({ message: 'Already following this user' });
        }

        // Follow user
        currentUser.following.push(targetUserId);
        targetUser.followers.push(currentUserId);

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const { currentUserId, targetUserId } = req.body;

        // Check if both users exist
        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return res.status(404).json({ message: 'User(s) not found' });
        }

        // Check if already following
        if (!currentUser.following.includes(targetUserId)) {
            return res.status(400).json({ message: 'Not following this user' });
        }

        // Unfollow user
        currentUser.following.pull(targetUserId);
        targetUser.followers.pull(currentUserId);

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
