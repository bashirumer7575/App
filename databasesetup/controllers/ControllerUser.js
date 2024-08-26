// controllers/ControllerUser.js
const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create a new user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password // Store plain text password
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        // Handle specific duplicate key error
        if (error.code && error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        res.status(400).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = req.body.password; // Store plain text password
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
