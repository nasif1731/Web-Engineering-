import React, { useEffect, useState, useCallback } from 'react';
import { SessionList } from '../../components/sessions';
import EarningsChart from '../../components/earnings/EarningsChart';
import axios from 'axios';
import { useAuth } from '../../context';

const SessionManagement = () => {
  const { user } = useAuth();
  const tutorId = user?._id;

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
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
    if (!window.confirm("Cancel this session?")) return;
    try {
      await axios.delete(`/api/sessions/${sessionId}`);
      fetchSessions();
    } catch (err) {
      console.error("Cancel failed", err);
    }
  };

  const handleComplete = async (sessionId) => {
    try {
      await axios.put(`/api/sessions/${sessionId}/status`, {
        status: "completed",
      });
      fetchSessions();
    } catch (err) {
      console.error("Mark complete failed", err);
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
        alert(`Not available on ${dayName} at ${formattedTime}`);
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
        alert("Slot already booked.");
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
      console.error("Reschedule failed", err);
    }
  };
  const computeEarnings = (sessions) => {
    const weekly = {};
    const monthly = {};
  
    sessions.forEach((s) => {
      if (s.status === 'completed') {
        const date = new Date(s.date);
        const week = `${date.getFullYear()}-W${String(Math.floor(date.getDate() / 7) + 1).padStart(2, '0')}`;
        const month = date.toISOString().slice(0, 7);
  
        weekly[week] = (weekly[week] || 0) + s.price;
        monthly[month] = (monthly[month] || 0) + s.price;
      }
    });
  
    return { weekly, monthly };
  };
  
  const earnings = computeEarnings(sessions);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Manage Your Sessions</h2>
      <SessionList
        sessions={sessions}
        loading={loading}
        onCancel={handleCancel}
        onComplete={handleComplete}
        onReschedule={handleReschedule}
      />
      <EarningsChart weekly={earnings.weekly} monthly={earnings.monthly} />
    </div>
  );
};

export default SessionManagement;
