const mongoose = require('mongoose');
const verificationRequestSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminComment: String,
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VerificationRequest', verificationRequestSchema);