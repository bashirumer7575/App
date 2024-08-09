const express = require('express');
const router = express.Router();
const likeController = require('../controllers/ControllerLike');

// Define routes for like actions
router.post('/', likeController.likePost);
router.delete('/:id', likeController.unlikePost);

module.exports = router;
