import React, { useState } from "react";
import { Card } from "../common";
import ReviewForm from "../reviews/ReviewForm";
import { useAuth } from "../../context";

const SessionCard = ({ session, onCancel, onComplete, onReschedule }) => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState(session.date.slice(0, 10));
  const [newTime, setNewTime] = useState(session.time);

  // 🧠 Utility to get available times for selected date
  const getAvailableTimes = () => {
    if (!session.tutor?.availability) return [];
    const dayName = new Date(newDate).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const daySlot = session.tutor.availability.find(
      (slot) => slot.day.toLowerCase() === dayName.toLowerCase()
    );
    return daySlot ? daySlot.times : [];
  };

  const handleReschedule = () => {
    if (!newDate || !newTime) return;
    onReschedule(session._id, newDate, newTime);
    setShowReschedule(false);
  };
  const { user } = useAuth();
  const isTutor = user?.role === "tutor";

  return (
    <Card className="mb-4">
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-semibold">
            {session.subject || "Tutoring Session"}
          </h3>
          <p className="text-gray-500">
            {new Date(session.date).toLocaleDateString()} at {session.time}
          </p>
          <p className="text-sm text-gray-600">
            Duration: {session.duration} hr(s)
          </p>
          <p className="text-sm text-gray-600">Type: {session.type}</p>
          <p className="mt-1 font-medium">Status: {session.status}</p>
        </div>

        <div className="flex flex-col gap-2">
          {["pending", "rescheduled"].includes(session.status) && (
            <>
              <button
                onClick={() => onCancel(session._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowReschedule(!showReschedule)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Reschedule
              </button>
            </>
          )}

          {isTutor &&
            ["pending", "accepted", "rescheduled"].includes(session.status) && (
              <button
                onClick={() => onComplete(session._id)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                ✅ Mark Complete
              </button>
            )}
          {session.status === "completed" && (
            <p className="text-sm text-green-600 font-semibold mt-2">
              ✅ Session Completed
            </p>
          )}
        </div>
      </div>

      {showReschedule && (
        <div className="mt-4 space-y-2">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <select
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select Time --</option>
            {getAvailableTimes().map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
          <button
            onClick={handleReschedule}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Confirm Reschedule
          </button>
        </div>
      )}
    </Card>
  );
};

export default SessionCard;
