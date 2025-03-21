const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, unique: true, required: true },
  courseName: { type: String, required: true },
  department: { type: String, required: true },
  level: { type: Number, required: true },
  seatsTotal: { type: Number, required: true },
  prerequisites: [{ type: String }],
  schedule: [{
    day: { type: String, enum: ['M', 'T', 'W', 'Th', 'F'], required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  }]
});

module.exports = mongoose.model('Course', courseSchema);