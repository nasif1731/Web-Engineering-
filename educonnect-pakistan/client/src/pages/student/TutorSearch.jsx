import React, { useState, useEffect } from "react";
import { TutorList } from "../../components/tutors";
import axios from "axios";

const TutorSearch = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");
  const [teachingMode, setTeachingMode] = useState(""); // ✅ NEW
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/users/tutors");
        setTutors(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const filteredTutors = tutors.filter((tutor) => {
    return (
      (subject
        ? tutor.subjects.some((s) => s.toLowerCase() === subject.toLowerCase())
        : true) &&
      (city
        ? tutor.location?.toLowerCase().includes(city.toLowerCase())
        : true) &&
      (teachingMode
        ? tutor.teachingPreferences?.includes(teachingMode.toLowerCase())
        : true) &&
      (maxPrice ? tutor.hourlyRate <= parseInt(maxPrice) : true) &&
      (minRating ? tutor.rating >= parseFloat(minRating) : true) &&
      (day
        ? tutor.availability.some(
            (av) => av.day.toLowerCase() === day.toLowerCase()
          )
        : true) &&
      (time
        ? tutor.availability.some((av) =>
            av.times.some((t) => t.toLowerCase() === time.toLowerCase())
          )
        : true)
    );
  });

  const getAllAvailableTimes = () => {
    const allTimes = tutors.flatMap(
      (tutor) => tutor.availability?.flatMap((slot) => slot.times) || []
    );
    return [...new Set(allTimes)].sort();
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Find Your Tutor</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          className="border p-2 rounded-md"
          placeholder="Subject (e.g. Math)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="border p-2 rounded-md"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select
          className="border p-2 rounded-md"
          value={teachingMode}
          onChange={(e) => setTeachingMode(e.target.value)}
        >
          <option value="">Any Mode</option>
          <option value="online">Online</option>
          <option value="in-person">In-Person</option>
        </select>
        <input
          className="border p-2 rounded-md"
          placeholder="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          className="border p-2 rounded-md"
          placeholder="Min Rating (1-5)"
          type="number"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />
        <select
          className="border p-2 rounded-md"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option value="">Any Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
        <select
          className="border p-2 rounded-md"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">Any Time</option>
          {getAllAvailableTimes().map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <TutorList tutors={filteredTutors} loading={loading} />
    </div>
  );
};

export default TutorSearch;
