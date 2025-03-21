const isStudent = (req, res, next) => {
  if (!req.session.user?.rollNumber) {
      return res.redirect('/');
  }
  next();
};

const initializeSession = (req, res, next) => {
  // For student routes only
  if (req.path.startsWith('/student')) {
      req.session.potentialCourses = req.session.potentialCourses || [];
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.type === 'admin') {
    next();
  } else {
    res.redirect('/');
  }
};

const syncRegisteredCourses = async (req, res, next) => {
  if (req.session.user?.type === 'student') {
      try {
          const registrations = await Registration.find({
              studentRollNumber: req.session.user.rollNumber
          });
          
          req.session.potentialCourses = [
              ...new Set([
                  ...(req.session.potentialCourses || []),
                  ...registrations.map(r => r.courseCode)
              ])
          ];
          
          await req.session.save();
      } catch (error) {
          console.error('Session sync error:', error);
      }
  }
  next();
};

module.exports = { isStudent, isAdmin, initializeSession,syncRegisteredCourses };