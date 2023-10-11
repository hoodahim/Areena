import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BookingContextProvider } from './context/bookingContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { GlobalBookingContextProvider } from './context/GlobalBookingContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalBookingContextProvider>
        <BookingContextProvider>
          <App />
        </BookingContextProvider>
      </GlobalBookingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
