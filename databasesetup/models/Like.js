const mongoose = require('mongoose');

// Define the Like schema
const likeSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create the Like model
const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
