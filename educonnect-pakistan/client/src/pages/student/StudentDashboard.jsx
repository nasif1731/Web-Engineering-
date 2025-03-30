import React, { useEffect, useState, useCallback } from "react";
import { SessionList } from "../../components/sessions";
import { WishlistList } from "../../components/wishlist";
import { useAuth } from "../../context";
import axios from "axios";

const StudentDashboard = () => {
  const { user } = useAuth();
  const studentId = user?._id;

  const [sessions, setSessions] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  const fetchSessions = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/api/sessions/user/${studentId}?role=student`
      );
      setSessions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSessions(false);
    }
  }, [studentId]);

  const fetchWishlist = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/wishlist/${studentId}`);
      setWishlist(data?.tutors || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingWishlist(false);
    }
  }, [studentId]);

  useEffect(() => {
    if (!studentId) return;
    fetchSessions();
    fetchWishlist();
  }, [studentId, fetchSessions, fetchWishlist]);

  const handleCancel = async (sessionId) => {
    if (!window.confirm("Are you sure you want to cancel this session?"))
      return;
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
      // 1️⃣ Fetch session to get tutor ID
      const { data: sessionData } = await axios.get(
        `/api/sessions/user/${user._id}?role=student`
      );
      const session = sessionData.find((s) => s._id === sessionId);
      const tutorId = session?.tutor?._id;
  
      // 2️⃣ Fetch full tutor details
      const { data: tutor } = await axios.get(`/api/users/tutors/${tutorId}`);
      const teachingPrefs = tutor.teachingPreferences || [];
  
      
      const formattedTime = newTime.trim();
  
      // 4️⃣ Check if tutor supports the selected session type
      if (type && !teachingPrefs.includes(type)) {
        alert(`Tutor does not offer ${type} sessions.`);
        return;
      }
  
      // 5️⃣ Check if tutor is available at selected day/time
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
        alert(`Tutor is not available on ${dayName} at ${formattedTime}.`);
        return;
      }
      const hasConflict = sessionData.some(
        (s) =>
          s._id !== sessionId &&
          s.tutor._id === tutorId &&
          s.date.slice(0, 10) === newDate &&
          s.time.trim().toLowerCase() === formattedTime.toLowerCase() &&
          ['pending', 'accepted','rescheduled'].includes(s.status)
      );
  
      if (hasConflict) {
        alert("This time slot is already booked. Please choose a different time.");
        return;
      }
      // 6️⃣ Construct and send payload
      const payload = {
        status: "rescheduled",
        date: newDate,
        time: formattedTime,
        ...(type && { type }),
      };
  
      console.log("📦 Payload to send:", payload);
      await axios.put(`/api/sessions/${sessionId}/status`, payload);
      fetchSessions(); // refresh UI
    } catch (err) {
      console.error("Failed to reschedule session", err);
      alert("Could not reschedule session. Please check time and try again.");
    }
  };
  const handleRemoveFromWishlist = async (tutorId) => {
    try {
      await axios.post("/api/wishlist/remove", { studentId, tutorId });
  
      // Update localStorage
      const localList = JSON.parse(localStorage.getItem("wishlist")) || [];
      const updatedList = localList.filter((id) => id !== tutorId);
      localStorage.setItem("wishlist", JSON.stringify(updatedList));
  
      // Update UI and navbar counter
      window.dispatchEvent(new Event("wishlistUpdated"));
      fetchWishlist(); // Refresh list on dashboard
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto bg-[#fdf6e3] p-8 rounded-xl shadow-md">
      <h2 className="text-4xl font-extrabold text-[#3B2C1A] mb-6">
        🧙‍♂️ Student Dashboard
      </h2>

      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-[#5C3A21] mb-4">
          📚 Your Sessions
        </h3>
        <SessionList
          sessions={sessions}
          loading={loadingSessions}
          onCancel={handleCancel}
          onComplete={handleComplete}
          onReschedule={handleReschedule}
        />
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-[#5C3A21] mb-4">
          ❤️ Your Wishlist
        </h3>
        <WishlistList
          tutors={wishlist}
          loading={loadingWishlist}
          onRemove={handleRemoveFromWishlist}
        />
      </section>
    </div>
  );
};

export default StudentDashboard;
