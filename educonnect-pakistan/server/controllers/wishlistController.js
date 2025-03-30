const Wishlist = require('../models/Wishlist');

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ student: req.params.studentId }).populate('tutors');
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { studentId, tutorId } = req.body;
    const wishlist = await Wishlist.findOneAndUpdate(
      { student: studentId },
      { $addToSet: { tutors: tutorId } },
      { new: true, upsert: true }
    );
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { studentId, tutorId } = req.body;
    const wishlist = await Wishlist.findOneAndUpdate(
      { student: studentId },
      { $pull: { tutors: tutorId } },
      { new: true }
    );
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
