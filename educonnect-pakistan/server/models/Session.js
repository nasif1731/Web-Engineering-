const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  type: {
    type: String,
    enum: ['online', 'in-person'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'cancelled','rescheduled'],
    default: 'pending'
  },
  price: { type: Number, required: true }
}, { timestamps: true });


module.exports = mongoose.model('Session', sessionSchema);
