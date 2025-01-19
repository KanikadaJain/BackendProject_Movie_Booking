const Genre = require('../models/genre.model');

// Get all genres
exports.findAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch genres', error });
    }
};