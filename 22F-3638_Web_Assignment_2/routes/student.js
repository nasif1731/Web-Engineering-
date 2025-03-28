const express = require('express');
const Student = require('../models/Student');  
const Course = require('../models/Course');
const Registration = require('../models/Registration');
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
router.get('/get-schedule-data', async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.rollNumber) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const student = await Student.findOne({ rollNumber: req.session.user.rollNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Fetch registered courses from the database
    const registrations = await Registration.find({ studentRollNumber: student.rollNumber });
    const registeredCourses = await Course.find({ courseCode: { $in: registrations.map(r => r.courseCode) } });

    // Fetch potential (session-based) courses
    const sessionCourses = await Course.find({ courseCode: { $in: req.session.potentialCourses || [] } });

    // Merge both lists and remove duplicates
    const updatedCourses = [...new Map([...registeredCourses, ...sessionCourses].map(course => [course.courseCode, course])).values()];

    console.log("📌 Sending Updated Courses Data:", updatedCourses.map(c => c.courseCode));

    res.json(updatedCourses);
  } catch (error) {
    console.error('❌ Error fetching schedule data:', error);
    res.status(500).json({ error: 'Failed to fetch schedule data' });
  }
});



module.exports = router;