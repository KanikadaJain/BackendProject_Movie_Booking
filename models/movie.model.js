const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieId: { type: Number, required: true, unique: true },
    title: { type: String, required: true }, 
    published: { type: Boolean, default: false },
    released: { type: Boolean, default: false }, 
    poster_url: { type: String,
      default: "https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg",
    },
    trailer_url: { type: String,
      default: "https://www.youtube.com/watch?v=MTdpHs6HWwM",
    },
    wiki_url: { type: String,
      default: "https://www.mongodb.com/mern-stack",
    },
    release_date: { type: String },
    publish_date: { type: String },
    duration: { type: Number, default: 60, min: 0, max: 1200 }, 
    critic_rating: { type: Number, default: 4.0, min: 0, max: 5.0 },
    story_line: { type: String },
    artists: [], 
    genres: [], 
    shows: [], 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
