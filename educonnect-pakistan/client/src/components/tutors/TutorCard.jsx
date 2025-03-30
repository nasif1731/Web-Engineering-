import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../common";
import WishlistButton from "../wishlist/WishlistButton"; // adjust path as needed
import { useAuth } from "../../context";
import axios from "axios";

const TutorCard = ({ tutor }) => {
  const { user } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);

  const toggleWishlist = async () => {
    try {
      if (!user?._id) return alert("Please login to use wishlist");
      const payload = { studentId: user._id, tutorId: tutor._id };
  
      let updatedList = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (inWishlist) {
        await axios.post("/api/wishlist/remove", payload);
        updatedList = updatedList.filter(id => id !== tutor._id);
      } else {
        await axios.post("/api/wishlist/add", payload);
        updatedList.push(tutor._id);
      }
      localStorage.setItem("wishlist", JSON.stringify(updatedList));
      setInWishlist(!inWishlist);
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Wishlist toggle failed", err);
    }
  };

  useEffect(() => {
    const checkWishlist = async () => {
      if (!user?._id) return;
      const { data } = await axios.get(`/api/wishlist/${user._id}`);
      const tutorIds = data.tutors.map(t => t._id);
      localStorage.setItem('wishlist', JSON.stringify(tutorIds));
      const found = tutorIds.includes(tutor._id);
      setInWishlist(found);
    };
    checkWishlist();
  }, [user, tutor._id]);
  return (
    <Card className="flex flex-col items-center text-center">
      <img
        src={tutor.profilePicture || "/images/default-profile.png"}
        alt={tutor.name}
        className="w-20 h-20 object-cover rounded-full border mb-3"
      />
      <h3 className="text-lg font-semibold">{tutor.name}</h3>
      <p className="text-sm text-gray-600">{tutor.qualifications}</p>
      <p className="text-gray-700 font-medium mt-1">
        Rs. {tutor.hourlyRate}/hr
      </p>

      {/* ✅ Teaching Mode Tags */}
      <div className="flex gap-2 mt-2 flex-wrap justify-center">
        {tutor.teachingPreferences?.includes("online") && (
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
            📡 Online
          </span>
        )}
        {tutor.teachingPreferences?.includes("in-person") && (
          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
            🏠 In-Person
          </span>
        )}
      </div>

      <Link
        to={`/tutors/${tutor._id}`}
        className="mt-3 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm"
      >
        View Profile
      </Link>
      <WishlistButton inWishlist={inWishlist} onToggle={toggleWishlist} />
    </Card>
  );
};

export default TutorCard;
