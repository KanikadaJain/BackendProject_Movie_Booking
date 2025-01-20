const express = require('express');
const router = express.Router();
const genreController = require('../controllers/movie.controller');
// Routes for movie
router.get('/', genreController.findAllMovies);
router.get('/:id', genreController.findOne);
router.get('/:id/shows', genreController.findShows);

// Export the router
module.exports = router;