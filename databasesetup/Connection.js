const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'connected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
