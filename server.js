// Import required modules
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const { DB_URL } = require("./config/db.config");
require("dotenv").config();
// Create an Express application
const app = express();
const artistRoutes = require('./routes/artist.routes');
const genreRoutes = require('./routes/genre.routes');
const movieRoutes = require('./routes/movie.routes');
const userRoutes = require('./routes/user.routes');
app.use(express.json());

// Routes
app.use('/artists', artistRoutes);
app.use('/genres', genreRoutes);
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Cannot connect to the database!", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
    res.json({
      message: "Welcome to Upgrad Movie booking application development.",
    });
});
  
  // Set port and start listening for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


// // Define port
// const port = 9000;
// // Define the /movies route
// app.get('/movies', (req, res) => {
//     res.send('All Movies Data in JSON format from Mongo DB');
// });

// // Define the /genres route
// app.get('/genres', (req, res) => {
//     res.send('All Genres Data in JSON format from Mongo DB');
// });

// // Define the /artists route
// app.get('/artists', (req, res) => {
//     res.send('All Artists Data in JSON format from Mongo DB');
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });