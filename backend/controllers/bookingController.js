const Booking = require('../models/bookingModel');
const mongoose = require('mongoose');

// get all bookings
const getBookings = async (req, res) => {
  const user_id = req.user._id;
  const booking = await Booking.find({ user_id }).sort({ createdAt: -1 });
  if (!booking) {
    return res.status(404).json({ error: `Cannot find bookings` });
  }
  res.status(200).json(booking);
};

// get booking by id
const getBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Id' });
  }
  const booking = await Booking.findById(id);

  if (!booking) {
    res.status(404).json({ error: `No booking with this ID` });
  }
  res.status(200).json(booking);
};

// create new booking
const createBooking = async (req, res) => {
  const { location, date, time, booked, qrCode } = req.body;
  const user_id = req.user._id;

  try {
    const booking = await Booking.create({
      location,
      date,
      time,
      booked,
      qrCode,
      user_id,
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete booking by id
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Id' });
  }

  const booking = await Booking.findByIdAndDelete(id);

  if (!booking) {
    res.status(404).json({ error: `Cannot delete booking!` });
  }
  res.status(200).json(booking);
};

// update booking by id
const updateBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Id' });
  }

  const booking = await Booking.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!booking) {
    return res.status(400).json({ error: `Cannot update Booking` });
  }

  res.status(200).json(booking);
};

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
};
