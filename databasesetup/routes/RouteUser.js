// routes/RouteUser.js
const express = require('express');
const router = express.Router();
const ControllerUser = require('../controllers/ControllerUser');

// Route to create a new user
router.post('/', ControllerUser.createUser);

// Route to get a user by ID
router.get('/:id', ControllerUser.getUser);

// Route to update a user by ID
router.put('/:id', ControllerUser.updateUser);

// Route to delete a user by ID
router.delete('/:id', ControllerUser.deleteUser);

module.exports = router;
