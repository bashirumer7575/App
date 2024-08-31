const express = require('express');
const router = express.Router();
const { createComment, getComment, updateComment, deleteComment, getCommentsByPost, countCommentsForPost } = require('../controllers/ControllerComment');

// Define routes for comments
router.post('/', createComment);
router.get('/:id', getComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

// New routes for filtering by post
router.get('/post/:postId', getCommentsByPost);
router.get('/post/:postId/count', countCommentsForPost);

module.exports = router;
