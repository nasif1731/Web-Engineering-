const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await User.find({ role: 'tutor', verificationStatus: 'verified' }).select('-password');
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTutorById = async (req, res) => {
    try {
      const tutor = await User.findById(req.params.id).select('-password');
      if (!tutor || tutor.role !== 'tutor') {
        return res.status(404).json({ message: 'Tutor not found' });
      }
      res.status(200).json(tutor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
