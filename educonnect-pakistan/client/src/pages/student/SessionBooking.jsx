import React, { useState, useEffect } from "react";
import { Button, Input, ErrorMessage } from "../../components/common";
import { useAuth } from "../../context";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SessionBooking = () => {
  const { user } = useAuth();
  const location = useLocation();
  const tutorIdFromUrl = new URLSearchParams(location.search).get("tutor");

  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [formData, setFormData] = useState({
    tutorId: tutorIdFromUrl || "",
    date: "",
    time: "",
    duration: 1,
    type: "online",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get("/api/users/tutors");
        setTutors(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch tutors:", err);
      }
    };
    fetchTutors();
  }, []);

  useEffect(() => {
    const found = tutors.find((t) => t._id === formData.tutorId);
    setSelectedTutor(found || null);
    if (found?.teachingPreferences?.length === 1) {
      setFormData(prev => ({ ...prev, type: found.teachingPreferences[0] }));
    }
  }, [formData.tutorId, tutors]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formatTimeTo12Hour = (time24) => {
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 === 0 ? 12 : hour % 12;
    const formatted = `${hour}:${minute} ${ampm}`;
    return formatted.replace(/\s+(AM|PM)\s+\1/, ' $1').trim();
  };
  

  const getAvailableTimesForDate = () => {
    if (!selectedTutor || !formData.date) return [];
    const dayName = new Date(formData.date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const daySlot = selectedTutor.availability?.find(
      (slot) => slot.day.toLowerCase() === dayName.toLowerCase()
    );
    return daySlot ? daySlot.times : [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id || !formData.tutorId) {
      setError("Please select a tutor and ensure you are logged in.");
      return;
    }

    const payload = {
      tutorId: formData.tutorId,
      student: user._id,
      date: formData.date,
      time: formData.time, // ✅ use time directly from dropdown
      duration: parseInt(formData.duration),
      type: formData.type,
      price: selectedTutor?.hourlyRate || 0,
    };

    if (
      selectedTutor &&
      !selectedTutor.teachingPreferences.includes(formData.type)
    ) {
      setError(
        `Tutor does not offer ${formData.type} sessions. Please choose a valid option.`
      );
      return;
    }

    try {
      console.log("📤 Payload to send:", payload);
      console.log("🎯 Tutor available times:", getAvailableTimesForDate());
      console.log("Selected time:", formData.time);

      await axios.post("/api/sessions", payload);
      setSuccess("✅ Session booked successfully!");
      setError("");

      setFormData({
        tutorId: tutorIdFromUrl || "",
        date: "",
        time: "",
        duration: 1,
        type: "online",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error("❌ Booking failed:", err);
      const message = err.response?.data?.message || "";
      if (message.includes("not available")) {
        setError(
          "Tutor is not available at the selected date/time. Please choose a different slot."
        );
      } else if (message.includes("already booked")) {
        setError("This session slot is already booked.");
      } else if (message.includes("does not offer")) {
        setError(message);
      } else {
        setError("An error occurred while booking. Please try again.");
      }
      setSuccess("");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">📅 Book a Session</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!tutorIdFromUrl ? (
          <>
            <label className="block text-sm font-medium">Select Tutor</label>
            <select
              name="tutorId"
              className="border p-2 rounded w-full"
              value={formData.tutorId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              {tutors.map((tutor) => (
                <option key={tutor._id} value={tutor._id}>
                  {tutor.name} ({tutor.subjects.join(", ")})
                </option>
              ))}
            </select>
          </>
        ) : (
          <div className="bg-gray-50 p-3 rounded border">
            <p className="text-sm text-gray-600">
              Booking session with:{" "}
              <strong>{selectedTutor?.name || "..."}</strong>
            </p>
          </div>
        )}

        <Input
          name="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label className="block text-sm font-medium">Time</label>
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select Time --</option>
          {getAvailableTimesForDate().map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <Input
          name="duration"
          label="Duration (hours)"
          type="number"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        {selectedTutor && (
          <>
            <label className="block text-sm font-medium">Session Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">-- Select Type --</option>
              {selectedTutor.teachingPreferences?.map((mode, i) => (
                <option key={i} value={mode}>
                  {mode === "online" ? "📡 Online" : "🏠 In-Person"}
                </option>
              ))}
            </select>
          </>
        )}

        {selectedTutor && (
          <div className="text-sm text-gray-600 mt-2">
            💰 Hourly Rate: <strong>Rs. {selectedTutor.hourlyRate}</strong>
            <br />
            Available Modes:{" "}
            {selectedTutor.teachingPreferences.includes("online") &&
              "📡 Online "}
            {selectedTutor.teachingPreferences.includes("in-person") &&
              "🏠 In-Person"}
          </div>
        )}

        {error && <ErrorMessage message={error} />}
        {success && <p className="text-green-600">{success}</p>}

        <Button type="submit">Confirm Booking</Button>
      </form>
    </div>
  );
};

export default SessionBooking;
