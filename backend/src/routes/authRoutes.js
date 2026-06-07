const express = require('express');
const {register} = require('../controllers/authController.js');

const registerRoute = express.Router();

registerRoute.post('/register', register);

module.exports = registerRoute;