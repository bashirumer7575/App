const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Send a message
router.post('/', messageController.sendMessage);

// Get messages between two users
router.get('/:userId', messageController.getMessagesBetweenUsers);

module.exports = router;
