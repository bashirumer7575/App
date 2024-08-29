// routes/RouteUser.js
const express = require('express');
const router = express.Router();
const ControllerUser = require('../controllers/ControllerUser');

// Existing routes
router.post('/', ControllerUser.createUser);
router.get('/:id', ControllerUser.getUser);
router.put('/:id', ControllerUser.updateUser);
router.delete('/:id', ControllerUser.deleteUser);
router.post('/login', ControllerUser.loginUser);

// New connection-related routes
router.post('/add', ControllerUser.addConnection);
router.post('/accept/:userId', ControllerUser.acceptConnection);
router.post('/reject/:userId', ControllerUser.rejectConnection);
router.get('/connections', ControllerUser.getConnections);

module.exports = router;
