const { default: mongoose } = require('mongoose');
require('dotenv').config();

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connect;
