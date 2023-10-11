const mongoose = require('mongoose');

const globalBookingDataSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Globalbookingdata', globalBookingDataSchema);
