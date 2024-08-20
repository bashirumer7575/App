const express = require('express');
const router = express.Router();
const { createPost, getPost, updatePost, deletePost } = require('../controllers/ControllerPosts');

// Define routes for posts
router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
