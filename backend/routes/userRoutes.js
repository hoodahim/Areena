const express = require('express');
const router = express.Router();

const { LoginUser, RegisterUser } = require('../controllers/userController');

//login route

router.post('/login', LoginUser);

//register route

router.post('/register', RegisterUser);

module.exports = router;
