const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const message = new Message({
      sender: req.body.sender,
      receiver: req.body.receiver,
      content: req.body.content
    });
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get messages between two users
exports.getMessagesBetweenUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const otherUserId = req.query.otherUserId;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    res.send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
};
