require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const express = require('express');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const globaldataRoutes = require('./routes/globaldataRoutes');

// express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`The endpoint is ${req.path}, The request type is ${req.method}`);
  next();
});

// Connecting to db
dbConnect()
  .then(() => {
    // Listening on port
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}, connected to database`);
  })
  .catch((error) => {
    console.log(error);
  });

// Routes

app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/globaldata', globaldataRoutes);
