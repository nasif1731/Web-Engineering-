const Course = require('../models/Course');
const Registration = require('../models/Registration');
const Student = require('../models/Student');

const getDashboard = (req, res) => {
  res.render('admin/dashboard');
};

const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.render('admin/courses', { courses });
};

const addCourse = async (req, res) => {
  const { courseCode, courseName, department, level, seatsTotal, prerequisites, days, startTimes, endTimes } = req.body;
  const schedule = Array.isArray(days)
    ? days.map((day, i) => ({
        day,
        startTime: startTimes[i],
        endTime: endTimes[i]
      }))
    : [{ day: days, startTime: startTimes, endTime: endTimes }];
    await Course.create({
      courseCode,
      courseName,
      department,
      level: parseInt(level),
      seatsTotal: parseInt(seatsTotal),
      prerequisites: prerequisites ? prerequisites.split(',') : [],
      schedule
    });
    res.redirect('/admin/courses');
  };

  const updateCourse = async (req, res) => {
    const { courseCode } = req.params;
    const { courseName, department, level, seatsTotal, prerequisites, days, startTimes, endTimes } = req.body;
    const schedule = Array.isArray(days)
      ? days.map((day, i) => ({
          day,
          startTime: startTimes[i],
          endTime: endTimes[i]
        }))
      : [{ day: days, startTime: startTimes, endTime: endTimes }];
  
    await Course.findOneAndUpdate(
      { courseCode },
      {
        courseName,
        department,
        level: parseInt(level),
        seatsTotal: parseInt(seatsTotal),
        prerequisites: prerequisites ? prerequisites.split(',') : [],
        schedule
      }
    );
    res.redirect('/admin/courses');
  };

const deleteCourse = async (req, res) => {
  const { courseCode } = req.params;
  await Course.findOneAndDelete({ courseCode });
  await Registration.deleteMany({ courseCode });
  res.redirect('/admin/courses');
};

const getStudents = async (req, res) => {
  const students = await Student.find();
  res.render('admin/students', { students, registrations: null, courses: null });
};

const manageStudent = async (req, res) => {
  const { rollNumber } = req.params;
  const student = await Student.findOne({ rollNumber });
  const registrations = await Registration.find({ studentRollNumber: rollNumber });
  const courses = await Course.find();
  res.render('admin/students', { students: [student], registrations, courses });
};

const overrideRegistration = async (req, res) => {
  const { rollNumber, courseCode } = req.body;
  await Registration.findOneAndUpdate(
    { studentRollNumber: rollNumber, courseCode },
    { studentRollNumber: rollNumber, courseCode },
    { upsert: true }
  );
  res.redirect(`/admin/students/${rollNumber}`);
};

const getReports = async (req, res) => {
  const courseRegistrations = await Registration.aggregate([
    { $group: { _id: '$courseCode', students: { $push: '$studentRollNumber' } } }
  ]);
  const coursesWithSeats = await Course.find().then(courses => Promise.all(courses.map(async c => {
    const count = await Registration.countDocuments({ courseCode: c.courseCode });
    return { ...c.toObject(), seatsAvailable: c.seatsTotal - count };
  })));
  const missingPrereqs = await Promise.all((await Student.find()).map(async s => {
    const regs = await Registration.find({ studentRollNumber: s.rollNumber });
    const courses = await Course.find({ courseCode: { $in: regs.map(r => r.courseCode) } });
    const issues = courses.filter(c => c.prerequisites.some(p => !s.completedCourses.includes(p)));
    return issues.length > 0 ? { rollNumber: s.rollNumber, courses: issues } : null;
  })).then(results => results.filter(r => r));
  res.render('admin/reports', { courseRegistrations, coursesWithSeats, missingPrereqs });
};

module.exports = {
  getDashboard,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getStudents,
  manageStudent,
  overrideRegistration,
  getReports
};