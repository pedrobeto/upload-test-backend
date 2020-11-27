const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

const controller = require('../controllers/user.controller');

const verifyToken = require('../verifyToken');

// Routes

// Gets all users at once
router.get('/',  verifyToken, controller.get_all);

// Gets a specific user
router.get('/:userId', verifyToken, controller.get_one);

// Register route
router.post('/register', controller.register);

// Login route
router.post('/login', controller.login);

//Deletes a specific user
router.delete('/:userId', controller.delete);

// Update a user
router.patch('/:userId', controller.update);

module.exports = router;