// WishlistCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common';

const WishlistCard = ({ tutor, onRemove }) => (
  <Card className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-4">
      <img
        src={tutor.profilePicture || '/default-profile.png'}
        alt={tutor.name}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <Link to={`/tutors/${tutor._id}`} className="font-semibold text-blue-600 hover:underline">
          {tutor.name}
        </Link>
        <p className="text-gray-600 text-sm">{tutor.qualifications}</p>
      </div>
    </div>
    <button
      onClick={() => onRemove(tutor._id)}
      className="text-sm text-red-500 hover:text-red-700"
    >
      Remove
    </button>
  </Card>
);

export default WishlistCard;
