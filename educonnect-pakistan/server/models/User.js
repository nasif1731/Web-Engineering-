const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['student', 'tutor', 'admin'], required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
 
  subjects: [String],
  hourlyRate: Number,
  availability: [{ day: String, times: [String] }],
  rating: { type: Number, default: 0 },
  verificationStatus: { 
    type: String, 
    enum: ['pending', 'verified', 'rejected'], 
    default: 'pending' 
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  profilePicture: String
});

module.exports = mongoose.model('User', userSchema);