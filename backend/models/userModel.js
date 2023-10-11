const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// User Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static method to register

userSchema.statics.register = async function (name, email, password) {
  if (!email || !password || !name) {
    throw new Error('Email and password are required');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Email is invalid');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.create({ name, email, password: hashedPassword });

  return user;
};

// static method to login

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('User does not exist');
  }

  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    throw new Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
