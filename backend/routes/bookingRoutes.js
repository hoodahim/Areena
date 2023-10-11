const express = require('express');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getBookings);
router.post('/', createBooking);
router.get('/:id', getBooking);
router.delete('/:id', deleteBooking);
router.patch('/:id', updateBooking);

module.exports = router;
