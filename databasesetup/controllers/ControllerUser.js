const User = require('../models/User');
const bcrypt = require('bcrypt');

// Create a new user
exports.createUser = async (req, res) => {                                                                  
    try {
        const { username, email, password, bio, connections } = req.body;

        // Check if the user already exists by email
        const existingUser = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            bio,
            connections,
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a user by ID
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;

        // If password is being updated, hash it
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        // Only allow updating of certain fields
        const allowedUpdates = ['username', 'bio'];
        const actualUpdates = Object.keys(updates).filter(update => allowedUpdates.includes(update));

        if (actualUpdates.length === 0) {
            return res.status(400).json({ message: 'Invalid updates!' });
        }

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {   
        res.status(500).json({ error: error.message });
    }
};

// Authenticate the user (Login)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
  
        console.log('Login attempt:', { email, password });

        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        if (!user) {
            console.log('User not found with email:', email);
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Search users by username
exports.searchUsers = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const users = await User.find({ username: { $regex: searchQuery, $options: 'i' } });
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};
