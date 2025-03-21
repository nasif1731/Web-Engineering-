const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  studentRollNumber: { type: String, required: true },
  courseCode: { type: String, required: true }
}, { indexes: [{ key: { studentRollNumber: 1, courseCode: 1 }, unique: true }] });

module.exports = mongoose.model('Registration', registrationSchema);