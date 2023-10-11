const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'You must be logged in' });
  }
};

module.exports = requireAuth;
