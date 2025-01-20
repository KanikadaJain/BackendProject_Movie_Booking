const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');
// Routes for genre
router.get('/', genreController.findAllGenres);
// Export the router
module.exports = router;