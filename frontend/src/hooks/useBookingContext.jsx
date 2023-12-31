import { BookingContext } from '../context/BookingContext';
import { useContext } from 'react';

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      'useBookingContext must be used within a BookingContextProvider'
    );
  }
  return context;
};
