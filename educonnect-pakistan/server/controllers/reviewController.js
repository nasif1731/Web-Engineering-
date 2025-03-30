

const Review = require('../models/Review');
const User = require('../models/User'); // Add this

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    // ✅ Recalculate average rating
    const reviews = await Review.find({ tutor: review.tutor });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await User.findByIdAndUpdate(review.tutor, {
      rating: avgRating.toFixed(1),
      ratingCount: reviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getReviewsByTutor = async (req, res) => {
  try {
    const reviews = await Review.find({ tutor: req.params.tutorId }).populate('student');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    // ✅ Recalculate average rating after delete
    const reviews = await Review.find({ tutor: review.tutor });
    const avgRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    await User.findByIdAndUpdate(review.tutor, {
      rating: avgRating.toFixed(1),
      ratingCount: reviews.length,
    });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

