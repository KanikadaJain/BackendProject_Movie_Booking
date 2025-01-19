const Genre = require('../models/genre.model');

// Get all genres
exports.getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch genres', error });
    }
};

// Get genre by ID
exports.getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch genre', error });
    }
};