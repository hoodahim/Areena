import { GlobalBookingContext } from '../context/GlobalBookingContext';
import { useContext } from 'react';

export const useGlobalBookingContext = () => {
  const context = useContext(GlobalBookingContext);

  if (!context) {
    throw new Error(
      'useGlobalBookingContext must be used within a GlobalBookingContextProvider'
    );
  }
  return context;
};
