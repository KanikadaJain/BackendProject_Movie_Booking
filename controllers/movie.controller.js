const Movies = require('../models/movie.model');

// Get all movies
exports.findAllMovies = async (req, res) => {
  try {
    let condition = {};
    if (req.query.status) {
      if (req.query.status === "RELEASED") {
        condition.released = true;
      } 
      else if (req.query.status === "PUBLISHED") {
        condition.published = true;
      }
    }
    if (req.query.title && req.query.status === "RELEASED") {
      condition.title = req.query.title;
    }
    const movies = await Movies.find(condition);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error });
  }
};

// Get movie by ID
exports.findOne = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const movie = await Movies.findOne({ movieid: id });
    if (!movie) {
      return res.status(404).json({ message: `Not found Movie with id ${id}` });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie', error });
  }
};


exports.findShows = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const movie = await Movies.findOne({ movieid: id });
    if (!movie) {
      return res.status(404).json({ message: `Not found Movie with id ${id}` });
    }
    console.log(movie);
    res.status(200).json(movie.shows);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving Shows for movie', error });
  }
};