const express = require('express');
const { isStudent } = require('../middleware/authMiddleware');
const {
  getDashboard,
  getCourses,
  searchCourses,
  addToSchedule,
  removeFromSchedule,
  getSchedule,
  confirmRegistration,
  subscribeToCourse,
  dropCourse,
  getDashboardData
} = require('../controllers/studentController');
const router = express.Router();

router.use(isStudent);
router.get('/dashboard', getDashboard);
router.get('/courses', getCourses);
router.get('/api/courses', searchCourses);
router.post('/add-to-schedule', addToSchedule);
router.post('/remove-from-schedule', removeFromSchedule);
router.get('/schedule', getSchedule);
router.post('/confirm-registration', confirmRegistration);
router.post('/subscribe', subscribeToCourse);
router.post('/drop-course', dropCourse);
router.get('/dashboard-data', getDashboardData);

module.exports = router;