// TutorList.jsx
import React from 'react';
import TutorCard from './TutorCard';
import { Loader } from '../common';

const TutorList = ({ tutors, loading }) => {
  if (loading) return <Loader />;
  if (!tutors.length) return <p className="text-center">No tutors found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tutors.map(tutor => (
        <TutorCard key={tutor._id} tutor={tutor} />
      ))}
    </div>
  );
};

export default TutorList;
