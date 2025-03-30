const mongoose = require('mongoose');

const verificationRequestSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminComment: { type: String }
}, { timestamps: true });



module.exports = mongoose.model('VerificationRequest', verificationRequestSchema);
