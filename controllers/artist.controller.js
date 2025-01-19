const Artist = require('../models/artist.model');

// Get all artists
exports.getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch artists', error });
    }
};

// Get artist by ID
exports.getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch artist', error });
    }
};
