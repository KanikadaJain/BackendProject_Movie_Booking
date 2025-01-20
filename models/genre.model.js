const mongoose = require('mongoose');
// Genre schema
const genreSchema = new mongoose.Schema({
  genreid: { type: Number, required: true },
  genre: { type: String, required: true }
},
// Created at and updated at fields
{
  timestamps: true, 
});

// Export the Genre model
module.exports = mongoose.model('Genre', genreSchema);