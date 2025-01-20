const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist.controller');
// Routes for artist
router.get("/", artistController.getAllArtists);
// Export the router
module.exports = router;