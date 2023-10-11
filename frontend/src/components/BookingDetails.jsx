import QRCode from 'qrcode.react';
import { useBookingContext } from '../hooks/useBookingContext';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGlobalBookingContext } from '../hooks/useGlobalBookingContext';
import { REACT_APP_API_URL } from '../utils/apiConfig';

const BookingDetails = ({ booking }) => {
  const { dispatch } = useBookingContext();
  const [qrcode, setQrcode] = useState(true);
  const { state } = useAuthContext();
  const { globalbookings, dispatch: dispatchglobal } =
    useGlobalBookingContext();

  // Delete booking
  const handleClick = async () => {
    if (!state.user) {
      return;
    }
    const response = await fetch(
      `${REACT_APP_API_URL}/api/bookings/${booking._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_BOOKING', payload: json });
    }

    // Delete global booking

    const objToDelete = {
      location: booking.location,
      date: booking.date,
      time: booking.time,
    };

    const globalresponse = await fetch(
      `${REACT_APP_API_URL}/api/globaldata/delete`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objToDelete),
      }
    );
    const globaljson = await globalresponse.json();
    if (globalresponse.ok) {
      dispatchglobal({ type: 'DELETE_GLOBAL_BOOKING', payload: globaljson });
    }
  };

  const formattedDate = new Date(booking.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <div className="booking-details">
      <h4>Location: {booking.location}</h4>
      <p>
        <strong>Date: {formattedDate}</strong>
      </p>
      <p>
        <strong>Time: {booking.time}</strong>
      </p>

      {booking.booked &&
        (qrcode ? (
          <div
            className="booking-details-qrcode"
            onClick={() => setQrcode(!qrcode)}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '50px' }}
            >
              qr_code_2
            </span>
          </div>
        ) : (
          <div className="qrCode" onClick={() => setQrcode(!qrcode)}>
            <QRCode className="qrCode-visible" value={booking.qrcode} />
          </div>
        ))}

      <span
        className="material-symbols-outlined bookingdetailsdelete"
        onClick={handleClick}
      >
        event_busy
      </span>
    </div>
  );
};

export default BookingDetails;
