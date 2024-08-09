const express = require('express');
const router = express.Router();
const PostController = require('../controllers/ControllerPost'); // Correct controller

// Define routes and map them to controller functions
router.post('/', PostController.createPost);
router.get('/:id', PostController.getPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;
