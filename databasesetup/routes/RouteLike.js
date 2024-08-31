const express = require('express');
const router = express.Router();
const { createLike, getLike, deleteLike, getLikesByPost, countLikesForPost } = require('../controllers/ControllerLike');

// Define routes for likes
router.post('/', createLike);
router.get('/:id', getLike);
router.delete('/:id', deleteLike);

// New routes for filtering by post
router.get('/post/:postId', getLikesByPost);
router.get('/post/:postId/count', countLikesForPost);

module.exports = router;
