const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  genreid: { type: Number, required: true },
  genre: { type: String, required: true }
},
{
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Genre', genreSchema);