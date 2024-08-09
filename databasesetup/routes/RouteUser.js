const express = require('express');
const router = express.Router();
const UserController = require('../controllers/ControllerUser');

// Define routes and map them to controller functions
router.post('/', UserController.createUser);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
