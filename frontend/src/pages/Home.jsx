import { useEffect } from 'react';
import BookingDetails from '../components/BookingDetails';
import BookingForm from '../components/BookingForm';
import { useBookingContext } from '../hooks/useBookingContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGlobalBookingContext } from '../hooks/useGlobalBookingContext';

const Home = () => {
  const { bookings, dispatch } = useBookingContext();
  const { globalbookings, dispatch: dispatchglobal } =
    useGlobalBookingContext();
  const { state } = useAuthContext();

  useEffect(() => {
    const fetchbookings = async () => {
      const response = await fetch('http://localhost:5000/api/bookings', {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_BOOKINGS', payload: json });
      }
    };

    const fetchglobalbookings = async () => {
      const globalresponse = await fetch(
        'http://localhost:5000/api/globaldata'
      );

      const globaljson = await globalresponse.json();

      if (globalresponse.ok) {
        dispatchglobal({ type: 'SET_GLOBAL_BOOKINGS', payload: globaljson });
      }
    };

    fetchglobalbookings();

    if (state.user) {
      fetchbookings();
    }
  }, [dispatch, state]);

  return (
    <div className="home">
      <div className="bookings">
        {bookings &&
          bookings.map((booking) => (
            <BookingDetails key={booking._id} booking={booking} />
          ))}
      </div>
      <BookingForm />
    </div>
  );
};

export default Home;
