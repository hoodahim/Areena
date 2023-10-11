const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// create token

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: '30d',
  });
};

// login user

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const { name } = user;
    // create token
    const token = createToken(user._id);

    res.status(200).json({ name, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// register user

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.register(name, email, password);

    // create token
    const token = createToken(user._id);

    res.status(201).json({ name, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { LoginUser, RegisterUser };
