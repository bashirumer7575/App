const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Define routes and map them to controller functions
router.get('/', commentController.getComments);
router.post('/', commentController.createComment);
router.get('/:id', commentController.getCommentById);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
