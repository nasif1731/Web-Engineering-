// ReviewCard.jsx
import React from 'react';
import { Card } from '../common';

const ReviewCard = ({ review }) => (
  <Card className="mb-4">
    <div className="flex flex-col">
      <h3 className="text-md font-semibold">{review.student.name}</h3>
      <p className="text-yellow-500 font-bold">Rating: {review.rating}/5 ⭐️</p>
      <p className="mt-2 text-gray-600">{review.comment}</p>
      <span className="text-sm text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</span>
    </div>
  </Card>
);

export default ReviewCard;
