# Breif Introduction
Areena is an event location booking website designed to book and access the booked event location using a QR code.
It is based on MERN(MongoDb, Express, React and nodejs) stack and provided globally using onrender.com

# Link to operating website

--> https://areena-booking.onrender.com/ <--

# Running on local machine

To run the website on local machine clone the repository from the github

## Backend
1. Create an .env file on the backend folder containing-
     MONGO_URI = [your connection to the mongo database]
     SECRET = YourSecretKey
     PORT = PortNumberYouWantToRunTheServer
2. Run terminal in backend folder and execute npm install to install project related dependencies
3. In terminal, execute **npm start** to initialize server

## Frontend
1. Run terminal in frontend folder and execute npm install to install project related dependencies
2. Navigate to src/utils folder and configure apiconfig.jsx file, the REACT_APP_API_URL = https://localhost:[YourPortNumber]
3. In terminal, execute **npm run dev** to initialize the react app

# Future consideration

1. Add admin roles to create database that will be utilized to add new locations. ( currently a locally stored database is used to provide locations and time)
2. Remove bookings from the display pannel which have passed the current date.
3. Add more functionality to booking form enabling users to customize booking options.
