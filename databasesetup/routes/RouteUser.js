// routes/RouteUser.js
const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser, addConnection, removeConnection, getConnections } = require('../controllers/UserController');

// Define routes for users
router.post('/', createUser); // Create a new user
router.get('/:id', getUser); // Get a user by ID
router.put('/:id', updateUser); // Update a user by ID
router.delete('/:id', deleteUser); // Delete a user by ID

// Define routes for connections
router.post('/connections/add', addConnection); // Add a connection
router.post('/connections/remove', removeConnection); // Remove a connection
router.get('/:userId/connections', getConnections); // Get user's connections

module.exports = router;
