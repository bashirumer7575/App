const User = require('../models/User');
const bcrypt = require('bcrypt');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, bio, connections } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
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
            connections: [] // Initialize empty connections array
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
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful', user });  // Ensure this structure
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};

// Add a new connection
exports.addConnection = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        
        await User.findByIdAndUpdate(userId, {
          $addToSet: { connections: { userId: friendId, status: 'pending' } }
        });
        await User.findByIdAndUpdate(friendId, {
          $addToSet: { connections: { userId: userId, status: 'pending' } }
        });

        res.status(200).json({ message: "Connection request sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send connection request" });
    }
};

// Accept a connection
exports.acceptConnection = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        
        await User.updateMany(
          { _id: userId, "connections.userId": friendId },
          { $set: { "connections.$.status": "accepted" } }
        );
        await User.updateMany(
          { _id: friendId, "connections.userId": userId },
          { $set: { "connections.$.status": "accepted" } }
        );

        res.status(200).json({ message: "Connection accepted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to accept connection" });
    }
};

// Reject a connection
exports.rejectConnection = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        
        await User.updateMany(
          { _id: userId, "connections.userId": friendId },
          { $set: { "connections.$.status": "rejected" } }
        );
        await User.updateMany(
          { _id: friendId, "connections.userId": userId },
          { $set: { "connections.$.status": "rejected" } }
        );

        res.status(200).json({ message: "Connection rejected" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to reject connection" });
    }
};

// Get a user's connections
exports.getConnections = async (req, res) => {
    try {
        const userId = req.query.userId;
        const connections = await User.findById(userId).select('connections').exec();
        res.status(200).json(connections.connections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch connections" });
    }
};
