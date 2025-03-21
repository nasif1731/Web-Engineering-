const Student = require('../models/Student');
const Course = require('../models/Course');
const Registration = require('../models/Registration');
const Subscription = require('../models/Subscription');
const io = require('../server').io;

const getDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNumber: req.session.user.rollNumber
    });

    if (!student) {
      return res.status(404).render('error', {
        message: 'Student not found'
      });
    }

    const registrations = await Registration.find({
      studentRollNumber: student.rollNumber
    });

    const registeredCourses = await Course.find({
      courseCode: { $in: registrations.map(r => r.courseCode) }
    });

    // Add debug logs
    console.log('Registered courses:', registeredCourses.map(c => c.courseCode));

    res.render('student/dashboard', {
      student,
      registeredCourses
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).render('error', {
      message: 'Failed to load dashboard'
    });
  }
};

const getCourses = (req, res) => {
  res.render('student/courses', { courses: [] });
};

const searchCourses = async (req, res) => {
  const { department, level, time, days, openSeats } = req.query;
  let query = {};
  if (department) query.department = department;
  if (level) query.level = parseInt(level);
  if (days) query['schedule.day'] = { $in: days.split(',') };
  if (time) {
    const [start, end] = time.split('-');
    query['schedule.startTime'] = { $gte: start };
    query['schedule.endTime'] = { $lte: end };
  }

  const courses = await Course.find(query);
  const coursesWithSeats = await Promise.all(courses.map(async course => {
    const registrations = await Registration.countDocuments({ courseCode: course.courseCode });
    return { ...course.toObject(), seatsAvailable: course.seatsTotal - registrations };
  }));

  if (openSeats === 'true') {
    res.json(coursesWithSeats.filter(course => course.seatsAvailable > 0));
  } else {
    res.json(coursesWithSeats);
  }
};

const addToSchedule = async (req, res) => {
  try {
      const { courseCode } = req.body;
      
      
      const formattedCode = courseCode.toUpperCase();
      
      // Initialize if undefined
      req.session.potentialCourses = req.session.potentialCourses || [];
      
      // Check if already exists
      if (!req.session.potentialCourses.includes(formattedCode)) {
          req.session.potentialCourses.push(formattedCode);
          
          // Explicitly save session
          await new Promise((resolve, reject) => {
              req.session.save(err => {
                  if (err) reject(err);
                  resolve();
              });
          });
          
          console.log('Session after save:', req.session.potentialCourses);
      }

      res.json({ success: true });
  } catch (error) {
      console.error('Add to schedule error:', error);
      res.status(500).json({ error: 'Failed to add course' });
  }
};

const removeFromSchedule = (req, res) => {
  const { courseCode } = req.body;
  req.session.potentialCourses = req.session.potentialCourses.filter(c => c !== courseCode);
  res.json({ success: true });
};

const getSchedule = async (req, res) => {
  try {
    const potentialCourses = req.session.potentialCourses || [];
    console.log('Session courses:', potentialCourses); // Debug 4
    const courses = await Course.find({
      courseCode: { $in: potentialCourses }
    }).lean();

    console.log('Found courses:', courses.map(c => c.courseCode)); // Debug 5
    // Convert schedule times to HH:MM format
    const formattedCourses = courses.map(course => ({
      ...course,
      schedule: course.schedule.map(slot => ({
        ...slot,
        startTime: formatTime(slot.startTime),
        endTime: formatTime(slot.endTime)
      }))
    }));

    res.render('student/schedule', {
      courses: courses.map(course => ({
        ...course,
        schedule: course.schedule.map(slot => ({
          day: slot.day,
          startTime: slot.startTime.padStart(5, '0'),
          endTime: slot.endTime.padStart(5, '0')
        }))
      }))
    });
  } catch (error) {
    console.error('Schedule error:', error);
    res.status(500).render('error', {
      message: 'Failed to load schedule'
    });
  }
};

// Add helper function
function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}

const confirmRegistration = async (req, res) => {
  const potentialCourses = req.session.potentialCourses || [];
  const rollNumber = req.session.user.rollNumber;

  for (const courseCode of potentialCourses) {
    const course = await Course.findOne({ courseCode });
    const registrations = await Registration.countDocuments({ courseCode });
    if (registrations >= course.seatsTotal) {
      return res.status(400).json({ error: `No seats available for ${courseCode}` });
    }
  }

  for (const courseCode of potentialCourses) {
    await Registration.findOneAndUpdate(
      { studentRollNumber: rollNumber, courseCode },
      { studentRollNumber: rollNumber, courseCode },
      { upsert: true }
    );
  }

  req.session.potentialCourses = [];


  for (const courseCode of potentialCourses) {
    const course = await Course.findOne({ courseCode });
    const registrations = await Registration.countDocuments({ courseCode });

    if (course.seatsTotal - registrations === 1) {
      const subscriptions = await Subscription.find({ courseCode });
      subscriptions.forEach(sub => {
        io.to(courseCode).emit('seatAvailable', {
          courseCode,
          courseName: course.courseName,
          message: `A seat is available in ${course.courseCode}!`
        });
      });
      await Subscription.deleteMany({ courseCode });
    }
  }

  res.json({ success: true });
};

const subscribeToCourse = async (req, res) => {
  const { courseCode } = req.body;
  const rollNumber = req.session.user.rollNumber;
  await Subscription.findOneAndUpdate(
    { studentRollNumber: rollNumber, courseCode },
    { studentRollNumber: rollNumber, courseCode },
    { upsert: true }
  );
  res.json({ success: true, message: `Subscribed to ${courseCode}. You'll be notified when a seat opens.` });
};


const doCoursesConflict = (course1, course2) => {
  for (const slot1 of course1.schedule) {
    for (const slot2 of course2.schedule) {
      if (slot1.day === slot2.day) {
        const start1 = parseTime(slot1.startTime);
        const end1 = parseTime(slot1.endTime);
        const start2 = parseTime(slot2.startTime);
        const end2 = parseTime(slot2.endTime);
        if (start1 < end2 && start2 < end1) return true;
      }
    }
  }
  return false;
};

const dropCourse = async (req, res) => {
  const { courseCode } = req.body;
  const rollNumber = req.session.user.rollNumber;
  await Registration.deleteOne({ studentRollNumber: rollNumber, courseCode });
  res.redirect('/student/dashboard');
};

const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const getDashboardData = async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNumber: req.session.user.rollNumber
    });

    const registrations = await Registration.find({
      studentRollNumber: student.rollNumber
    });

    const registeredCourses = await Course.find({
      courseCode: { $in: registrations.map(r => r.courseCode) }
    });

    res.json({
      success: true,
      registeredCourses: registeredCourses.map(course => ({
        courseCode: course.courseCode,
        courseName: course.courseName
      }))
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to load dashboard data'
    });
  }
};

module.exports = {
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
};