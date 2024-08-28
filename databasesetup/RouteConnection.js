const express = require('express');
const { connectUser, getConnections } = require('../controllers/ControllerConnection');
const router = express.Router();

router.post('/connect/:id', connectUser);
router.get('/connections', getConnections);

module.exports = router;
