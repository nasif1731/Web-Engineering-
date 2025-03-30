// ReviewList.jsx
import React from 'react';
import ReviewCard from './ReviewCard';
import { Loader } from '../common';

const ReviewList = ({ reviews, loading }) => {
  if (loading) return <Loader />;
  if (!reviews.length) return <p className="text-center">No reviews available.</p>;

  return (
    <div>
      {reviews.map(review => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
