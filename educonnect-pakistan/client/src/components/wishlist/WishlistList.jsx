// WishlistList.jsx
import React from 'react';
import WishlistCard from './WishlistCard';
import { Loader } from '../common';

const WishlistList = ({ tutors, loading, onRemove }) => {
  if (loading) return <Loader />;
  if (!tutors.length) return <p className="text-center">Your wishlist is empty.</p>;

  return (
    <div>
      {tutors.map(tutor => (
        <WishlistCard key={tutor._id} tutor={tutor} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default WishlistList;
