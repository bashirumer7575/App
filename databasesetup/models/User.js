const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Replacing following and followers
});

const User = mongoose.model('User', userSchema);

module.exports = User;
