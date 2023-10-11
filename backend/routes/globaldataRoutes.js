const express = require('express');
const {
  getBookingData,
  createBookingData,
  deleteBookingData,
} = require('../controllers/bookingDataController');

const router = express.Router();

router.get('/', getBookingData);

router.post('/', createBookingData);

router.delete('/delete', deleteBookingData);

module.exports = router;
