const express = require('express');
const router = express.Router();
const {
    createPost,
    getPost,
    updatePost,
    deletePost,
    getPostsByUser,
    getAllPosts
} = require('../controllers/ControllerPosts');

// Route to create a new post
router.post('/', createPost);

// Route to get a single post by ID
router.get('/:id', getPost);

// Route to update a post by ID
router.put('/:id', updatePost);

// Route to delete a post by ID
router.delete('/:id', deletePost);

// Route to get all posts by a specific user
router.get('/user/:userId', getPostsByUser);

// Optional: Route to get all posts (for a feed page or similar)
router.get('/', getAllPosts);

module.exports = router;
