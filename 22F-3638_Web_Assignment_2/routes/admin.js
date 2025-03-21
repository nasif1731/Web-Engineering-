const express = require('express');
const { isAdmin } = require('../middleware/authMiddleware');
const {
  getDashboard,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getStudents,
  manageStudent,
  overrideRegistration,
  getReports
} = require('../controllers/adminController');
const router = express.Router();

router.use(isAdmin);
router.get('/dashboard', getDashboard);
router.get('/courses', getCourses);
router.post('/courses/add', addCourse);
router.post('/courses/update/:courseCode', updateCourse);
router.post('/courses/delete/:courseCode', deleteCourse);
router.get('/students', getStudents);
router.get('/students/:rollNumber', manageStudent);
router.post('/students/override', overrideRegistration);
router.get('/reports', getReports);

module.exports = router;