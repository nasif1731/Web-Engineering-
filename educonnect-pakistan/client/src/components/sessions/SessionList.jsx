// SessionList.jsx
import React from 'react';
import SessionCard from './SessionCard';
import { Loader } from '../common';

const SessionList = ({ sessions, loading, onCancel, onComplete, onReschedule }) => {
  if (loading) return <Loader />;
  if (!sessions.length) return <p className="text-center">No sessions booked yet.</p>;

  return (
    <div>
      {sessions.map(session => (
        <SessionCard
          key={session._id}
          session={session}
          onCancel={onCancel}
          onComplete={onComplete}
          onReschedule={onReschedule}
        />
      ))}
    </div>
  );
};

export default SessionList;