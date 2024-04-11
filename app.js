const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser"); 
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("mongoose");


//Models goes here
const BookingModel = require("./models/Booking.model");
const HomeModel = require("./models/Home.model");
const ReviewModel = require("./models/Review.model");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";
//Initialize Express app
const app = express();
// controls a very specific header to pass headers from the frontend
app.use(
  cors({
    origin: [FRONTEND_URL],
  })
);

//Initialise Middleware
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const connection = process.env.connection || "mongodb://127.0.0.1:27017/triphaven"

mongoose
  .connect(connection)
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));




// home route
app.get('/', (request, response, next) => {
    console.log(request);
    response.sendFile("Welcome to Triphaven HomePage")
});

//Middelware authroutes for all my entire routes on my project
const authroutes = require("./routes/auth.routes");
app.use('/auth', authroutes)

const userRoute = require("./routes/user.routes");
app.use('/user', userRoute)

const bookingRoute = require("./routes/booking.routes");
app.use('/booking', bookingRoute);

const homeRoute = require("./routes/home.routes");
app.use('/home', homeRoute);

const reviewRoute = require("./routes/review.routes");
app.use('/review', reviewRoute);



//start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
});