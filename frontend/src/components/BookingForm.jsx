import { useState } from 'react';
import venues from '../data/venues';
import timeSlots from '../data/timeSlots';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/locationSelector.css';
import '../styles/timeSelector.css';
import { useBookingContext } from '../hooks/useBookingContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGlobalBookingContext } from '../hooks/useGlobalBookingContext';

let availableTimeSlots = timeSlots;

const BookingForm = () => {
  const { bookings, dispatch } = useBookingContext();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(null);
  const { state } = useAuthContext();
  const { globalbookings, dispatch: dispatchglobal } =
    useGlobalBookingContext();

  // Filter available time slots based on selected date and location
  if (date && location && bookings) {
    availableTimeSlots = timeSlots.filter(
      (timeSlot) =>
        !globalbookings.some(
          (bookingItem) =>
            bookingItem.time === timeSlot &&
            bookingItem.location === location &&
            new Date(bookingItem.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }) ===
              date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
        )
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const qrCode = Math.random().toString(36).substring(2, 15);

    if (!state.user) {
      setError('Please login to make a booking');
      return;
    }
    const newBooking = { location, date, time, booked: true, qrCode };

    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      body: JSON.stringify(newBooking),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setLocation('');
      setDate('');
      setTime('');
      setError(null);
      dispatch({ type: 'CREATE_BOOKING', payload: json });
    }

    // Add the booking to global bookings

    const globalbooking = { location, date, time };

    const globalresponse = await fetch('http://localhost:5000/api/globaldata', {
      method: 'POST',
      body: JSON.stringify(globalbooking),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const globaljson = await globalresponse.json();

    if (!globalresponse.ok) {
      setError(globaljson.error);
    }
    if (globalresponse.ok) {
      dispatchglobal({ type: 'CREATE_GLOBAL_BOOKING', payload: globaljson });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Make a New Booking</h3>
      <div className="select-container">
        <label htmlFor="location" className="select-label">
          Select the Location:
        </label>
        <select
          name="location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="select-element"
        >
          {venues.map((venue) => (
            <option key={venue} value={venue}>
              {venue}
            </option>
          ))}
        </select>
      </div>
      {location && (
        <div className="date">
          <label htmlFor="date">Select the Date:</label>
          <DatePicker
            className="date-picker"
            minDate={new Date()}
            selected={date}
            dateFormat="dd/MM/yyyy"
            name="date"
            onChange={(date) => setDate(date)}
            isClearable // Add a clear button
            autoComplete="off"
          />
        </div>
      )}
      {date && location && (
        <div className="time-selector-container">
          <label htmlFor="time" className="time-selector-label">
            Select the Available time:
          </label>
          {availableTimeSlots.length !== 0 ? (
            <ul className="time-list">
              {availableTimeSlots.length === 0 && (
                <li style={{ color: 'red' }}>No time slots available</li>
              )}
              {availableTimeSlots.map((timeSlot, index) => (
                <li
                  key={index}
                  name="time"
                  onClick={() => setTime(timeSlot)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: timeSlot === time ? 'underline' : 'none',
                    backgroundColor:
                      timeSlot === time ? '#cfae82' : 'transparent',
                  }}
                >
                  {timeSlot}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'red' }}>No time slots available</p>
          )}
        </div>
      )}
      {location && date && time && (
        <button className="material-symbols-outlined">
          shopping_cart_checkout
        </button>
      )}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default BookingForm;
