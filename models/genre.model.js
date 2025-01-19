const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  genreid: { type: Number, required: true },
  genre: { type: String, required: true }
},
{
  timestamps: true, 
});

module.exports = mongoose.model('Genre', genreSchema);