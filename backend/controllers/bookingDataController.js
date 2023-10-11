const GlobalBookingData = require('../models/bookingDataModel');
const mongoose = require('mongoose');
// get global booking data
const getBookingData = async (req, res) => {
  try {
    const bookingData = await GlobalBookingData.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json(bookingData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create global booking data
const createBookingData = async (req, res) => {
  const { location, date, time } = req.body;

  try {
    const bookingData = await GlobalBookingData.create({
      location,
      date,
      time,
    });
    res.status(201).json(bookingData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// delete global booking data
const deleteBookingData = async (req, res) => {
  const obj = req.body;

  try {
    const booking = await GlobalBookingData.findOneAndDelete({
      location: obj.location,
      date: obj.date,
      time: obj.time,
    });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getBookingData,
  createBookingData,
  deleteBookingData,
};
