const Follow = require('../models/Follow');
const User = require('../models/User');

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const follow = new Follow({
      follower: req.body.followerId,
      following: req.params.userId
    });
    await follow.save();
    res.status(201).send(follow);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const follow = await Follow.findOneAndDelete({
      follower: req.body.followerId,
      following: req.params.userId
    });
    if (!follow) return res.status(404).send({ error: "Follow relationship not found" });
    res.send({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get followers of a user
exports.getFollowers = async (req, res) => {
  try {
    const followers = await Follow.find({ following: req.params.userId }).populate('follower', 'username');
    res.send(followers);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get users followed by a user
exports.getFollowing = async (req, res) => {
  try {
    const following = await Follow.find({ follower: req.params.userId }).populate('following', 'username');
    res.send(following);
  } catch (error) {
    res.status(500).send(error);
  }
};


