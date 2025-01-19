// Import required modules
const express = require('express');
// Create an Express application
const app = express();

// Define port
const port = 9000;

// Define the /movies route
app.get('/movies', (req, res) => {
    res.send('All Movies Data in JSON format from Mongo DB');
});

// Define the /genres route
app.get('/genres', (req, res) => {
    res.send('All Genres Data in JSON format from Mongo DB');
});

// Define the /artists route
app.get('/artists', (req, res) => {
    res.send('All Artists Data in JSON format from Mongo DB');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
