const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['student', 'tutor', 'admin'],
    required: true
  },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  location: { type: String },
  subjects: [String],
  hourlyRate: { type: Number },
  availability: [{
    day: { type: String, required: true },
    times: [String]
  }],
  qualifications: { type: String },
  bio: { type: String },
  teachingPreferences: [{
    type: String,
    enum: ['online', 'in-person']
  }],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  adminComment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);