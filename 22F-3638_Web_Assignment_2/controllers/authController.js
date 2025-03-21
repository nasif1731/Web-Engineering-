const Student = require('../models/Student');
const Admin = require('../models/Admin');

const loginStudent = async (req, res) => {
  const { rollNumber, password } = req.body;
  const student = await Student.findOne({ rollNumber, password }); // Direct match, no hashing
  if (student) {
    req.session.user = { type: 'student', rollNumber: student.rollNumber };
    res.redirect('/student/dashboard');
  } else {
    res.render('error', { message: 'Invalid roll number or password' });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password }); // Direct match, no hashing
  if (admin) {
    req.session.user = { type: 'admin', username: admin.username };
    res.redirect('/admin/dashboard');
  } else {
    res.render('error', { message: 'Invalid credentials' });
  }
};

module.exports = { loginStudent, loginAdmin };
