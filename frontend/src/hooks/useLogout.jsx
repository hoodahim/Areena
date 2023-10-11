import { useAuthContext } from './useAuthContext';
import { useBookingContext } from './useBookingContext';
import { useGlobalBookingContext } from './useGlobalBookingContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchBookings } = useBookingContext();
  const { dispatch: dispatchGlobalBookings } = useGlobalBookingContext();

  const logout = async () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    dispatchBookings({ type: 'SET_BOOKINGS', payload: null });
    dispatchGlobalBookings({ type: 'SET_GLOBAL_BOOKINGS', payload: null });
  };
  return { logout };
};
