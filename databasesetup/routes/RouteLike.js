const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/ControllerLike');

router.post('/', LikeController.createLike);
router.get('/:id', LikeController.getLike);
router.delete('/:id', LikeController.deleteLike);

module.exports = router;
