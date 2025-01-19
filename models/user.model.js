const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: Number }, 
    email: { type: String, required: true, unique: true }, 
    first_name: { type: String, required: true }, 
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, 
    contact: { type: String, required: true },
    password: { type: String, required: true }, 
    role: { type: String, default: "user", enum: ["admin", "user"] }, 
    uuid: { type: String, unique: true }, 
    accesstoken: { type: String }, 
    isLoggedIn: { type: Boolean, default: false }, 
    coupens: { type: [], default: [] }, 
    bookingRequests: { type: [], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
