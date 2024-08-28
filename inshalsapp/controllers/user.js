const User = require('../models/User');

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
