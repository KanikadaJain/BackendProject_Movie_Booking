const mongoose = require('mongoose');

// Artist schema
const artistSchema = new mongoose.Schema({
  artistid: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  wiki_url: { type: String,
    default: "https://www.mongodb.com/mern-stack",
    validate: {
      validator: (v) => /^(https?:\/\/[^\s]+)$/.test(v), // Validates URL format
      message: (props) => `${props.value} is not a valid URL!`, // Custom error message
    },
  },
  profile_url: { type: String, 
    default: "https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg",
    validate: {
      validator: (v) => /^(https?:\/\/[^\s]+)$/.test(v), // Validates URL format
      message: (props) => `${props.value} is not a valid URL!`, // Custom error message
    },
  },
  movies: { type: [String],
    default: [], 
  },
},
// Created at and updated at fields
{
  timestamps: true, 
}
);

// Export the Artist model
module.exports = mongoose.model('Artist', artistSchema);