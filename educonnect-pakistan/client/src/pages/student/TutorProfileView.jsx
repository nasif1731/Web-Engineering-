import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Loader } from '../../components/common';
import ReviewList from '../../components/reviews/ReviewList';
import ReviewForm from '../../components/reviews/ReviewForm';
import { useAuth } from '../../context';

const TutorProfileView = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewed, setReviewed] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewError, setReviewError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const { data } = await axios.get(`/api/users/tutors/${id}`);
        setTutor(data);
      } catch (error) {
        console.error('Failed to load tutor profile:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/tutor/${id}`);
        setReviews(res.data);
        setReviewed(res.data.some(r => r.student._id === user?._id));
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoadingReviews(false);
      }
    };

    const checkCompletedSession = async () => {
      try {
        const res = await axios.get(`/api/sessions/user/${user._id}?role=student`);
        const completed = res.data.some(
          s => s.tutor._id === id && s.status === "completed"
        );
        setCanReview(completed);
      } catch (err) {
        console.error("Failed to verify session completion", err);
      }
    };

    fetchTutor();

    if (user?.role === 'student') {
      fetchReviews();
      checkCompletedSession();
    }
  }, [id, user]);

  const handleReviewSubmit = async ({ rating, comment }) => {
    try {
      setSubmitting(true);
      setReviewError("");

      if (!rating || rating < 1 || rating > 5) {
        setReviewError("Rating must be between 1 and 5");
        return;
      }

      const payload = {
        tutor: id,
        student: user._id,
        rating: parseInt(rating),
        comment,
      };

      await axios.post("/api/reviews", payload);
      const res = await axios.get(`/api/reviews/tutor/${id}`);
      setReviews(res.data);
      setReviewed(true);
    } catch (err) {
      setReviewError("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (!tutor) return <p className="text-center text-red-500">Tutor not found.</p>;

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-6">
        <img
          src={tutor.profilePicture || '/images/default-profile.png'}
          alt={tutor.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-semibold">{tutor.name}</h2>
          <p className="text-gray-600">{tutor.qualifications}</p>
          <p className="text-sm text-gray-600 mb-1">{tutor.bio}</p>
          <p className="font-medium text-gray-800">💰 Rs. {tutor.hourlyRate}/hr</p>
          <p className="text-sm text-gray-600">📍 {tutor.location}</p>
          <p className="text-sm text-gray-600 mt-1">
            📚 Subjects: {tutor.subjects?.join(', ') || 'N/A'}
          </p>
          <p className="text-sm mt-1 text-yellow-600">
            ⭐ Rating: {tutor.rating || 0} ({tutor.ratingCount || 0} reviews)
          </p>
        </div>
      </div>

      {tutor.availability?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">📆 Availability</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {tutor.availability.map((slot, index) => (
              <li key={index}>
                <strong>{slot.day}:</strong> {slot.times.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Book Session */}
      <div className="mt-6 text-right">
        <Link
          to={`/sessions/book?tutor=${tutor._id}`}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded inline-block"
        >
          📅 Book a Session
        </Link>
      </div>

      {/* Review Section */}
      {user?.role === 'student' && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">⭐ Student Reviews</h3>

          {canReview && !reviewed && (
            <ReviewForm
              onSubmit={handleReviewSubmit}
              loading={submitting}
              error={reviewError}
            />
          )}

          {!canReview && (
            <p className="text-sm text-gray-500 italic">You can review this tutor after completing a session.</p>
          )}

          {reviewed && (
            <p className="text-green-600 font-medium mb-2">✅ You have already submitted a review.</p>
          )}

          <ReviewList reviews={reviews} loading={loadingReviews} />
        </div>
      )}
    </Card>
  );
};

export default TutorProfileView;
