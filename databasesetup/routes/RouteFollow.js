const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');

// Follow a user
router.post('/:userId/follow', followController.followUser);

// Unfollow a user
router.post('/:userId/unfollow', followController.unfollowUser);

// Get followers of a user
router.get('/:userId/followers', followController.getFollowers);

// Get users followed by a user
router.get('/:userId/following', followController.getFollowing);

module.exports = router;



