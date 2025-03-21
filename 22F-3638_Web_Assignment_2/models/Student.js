const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  completedCourses: [{ type: String }]
});

module.exports = mongoose.model('Student', studentSchema);