const express = require('express');
const router = express.Router();
const genreController = require('../controllers/movie.controller');

router.get('/', genreController.findAllMovies);
router.get('/:id', genreController.findOne);
router.get('/:id/shows', genreController.findShows);


module.exports = router;
