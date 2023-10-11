import { createContext, useReducer } from 'react';

export const GlobalBookingContext = createContext();

export const globalbookingsRedeucer = (state, action) => {
  switch (action.type) {
    case 'SET_GLOBAL_BOOKINGS':
      return {
        globalbookings: action.payload,
      };
    case 'DELETE_GLOBAL_BOOKING':
      return {
        globalbookings: state.globalbookings.filter(
          (globalbooking) => globalbooking._id !== action.payload._id
        ),
      };
    case 'CREATE_GLOBAL_BOOKING':
      return {
        globalbookings: [action.payload, ...state.globalbookings],
      };
    default:
      return state;
  }
};

export const GlobalBookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalbookingsRedeucer, {
    globalbookings: null,
  });

  return (
    <GlobalBookingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalBookingContext.Provider>
  );
};
