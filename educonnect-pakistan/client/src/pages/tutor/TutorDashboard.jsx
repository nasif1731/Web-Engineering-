import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { SessionList } from '../../components/sessions';
import { useAuth } from '../../context';

const TutorDashboard = () => {
  const { user } = useAuth();
  const tutorId = user?._id;

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/sessions/user/${tutorId}?role=tutor`);
      setSessions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [tutorId]);

  useEffect(() => {
    if (tutorId) fetchSessions();
  }, [tutorId, fetchSessions]);

  const handleCancel = async (sessionId) => {
    if (!window.confirm("Are you sure you want to cancel this session?")) return;
    try {
      await axios.delete(`/api/sessions/${sessionId}`);
      fetchSessions();
    } catch (err) {
      console.error("Failed to cancel session", err);
    }
  };

  const handleComplete = async (sessionId) => {
    try {
      await axios.put(`/api/sessions/${sessionId}/status`, {
        status: "completed",
      });
      fetchSessions();
    } catch (err) {
      console.error("Failed to mark session complete", err);
    }
  };

  const handleReschedule = async (sessionId, newDate, newTime, type) => {
    try {
      const { data: sessionData } = await axios.get(
        `/api/sessions/user/${tutorId}?role=tutor`
      );
      const session = sessionData.find((s) => s._id === sessionId);
      const studentId = session?.student?._id;
      const { data: tutor } = await axios.get(`/api/users/tutors/${tutorId}`);
      const formattedTime = newTime.trim();

      const dayName = new Date(newDate).toLocaleDateString("en-US", {
        weekday: "long",
      });

      const daySlot = tutor.availability?.find(
        (slot) => slot.day.toLowerCase() === dayName.toLowerCase()
      );

      const isAvailable = daySlot?.times?.some(
        (t) => t.trim().toLowerCase() === formattedTime.toLowerCase()
      );

      if (!isAvailable) {
        alert(`You are not available on ${dayName} at ${formattedTime}.`);
        return;
      }

      const hasConflict = sessionData.some(
        (s) =>
          s._id !== sessionId &&
          s.student._id === studentId &&
          s.date.slice(0, 10) === newDate &&
          s.time.trim().toLowerCase() === formattedTime.toLowerCase() &&
          ['pending', 'accepted', 'rescheduled'].includes(s.status)
      );

      if (hasConflict) {
        alert("That slot is already booked. Choose another.");
        return;
      }

      const payload = {
        status: "rescheduled",
        date: newDate,
        time: formattedTime,
        ...(type && { type }),
      };

      await axios.put(`/api/sessions/${sessionId}/status`, payload);
      fetchSessions();
    } catch (err) {
      console.error("Failed to reschedule session", err);
      alert("Could not reschedule session.");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold">Tutor Dashboard</h2>
      <section>
        <h3 className="text-xl font-semibold mb-4">Your Upcoming Sessions</h3>
        <SessionList
          sessions={sessions}
          loading={loading}
          onCancel={handleCancel}
          onComplete={handleComplete}
          onReschedule={handleReschedule}
        />
      </section>
    </div>
  );
};

export default TutorDashboard;
