const User = require('../models/User');

exports.connectUser = async (req, res) => {
    try {
        const userToConnect = await User.findById(req.params.id);
        if (!userToConnect) return res.status(404).json({ error: 'User not found' });

        if (!req.user.connections.includes(userToConnect._id)) {
            req.user.connections.push(userToConnect._id);
            await req.user.save();
            return res.status(200).json({ message: 'User connected' });
        } else {
            return res.status(400).json({ error: 'User already connected' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect user' });
    }
};

exports.getConnections = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('connections', 'username');
        res.status(200).json(user.connections);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get connections' });
    }
};
