// WishlistPage.jsx
import React, { useEffect, useState } from "react";
import { WishlistList } from "../../components/wishlist";
import axios from "axios";
import { useAuth } from "../../context";

const WishlistPage = () => {
  const { user } = useAuth();
  const studentId = user?._id;

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("name");
  const [filteredTutors, setFilteredTutors] = useState([]);

  // ✅ Fetch from backend
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/wishlist/${studentId}`);
      setWishlist(data.tutors);
  
      // ✅ Store only tutor IDs in localStorage
      const tutorIds = data.tutors.map(t => t._id);
      localStorage.setItem("wishlist", JSON.stringify(tutorIds));
  
      // ✅ Notify others (Navbar) after setting localStorage
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("❌ Failed to fetch wishlist:", error);
      const localData = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(localData);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove from wishlist
  const removeFromWishlist = async (tutorId) => {
    try {
      await axios.post('/api/wishlist/remove', { studentId, tutorId });
  
      const current = JSON.parse(localStorage.getItem("wishlist")) || [];
      const updated = current.filter(id => id.toString() !== tutorId.toString());
      localStorage.setItem("wishlist", JSON.stringify(updated));
  
      // ✅ Notify Navbar
      window.dispatchEvent(new Event("wishlistUpdated"));
  
      fetchWishlist();
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Sync wishlist on load
  useEffect(() => {
    if (studentId) {
      fetchWishlist();
    } else {
      const localData = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(localData);
    }
  }, [studentId]);

  // ✅ Sort on wishlist change
  useEffect(() => {
    let sorted = [...wishlist];
    if (sortOrder === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "rate") {
      sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortOrder === "rating") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    setFilteredTutors(sorted);
  }, [sortOrder, wishlist]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-teal-700">❤️ Your Wishlist</h2>

      {/* ✅ Wishlist Counter */}
      <p className="text-sm text-gray-500 mb-2">
        {filteredTutors.length} tutor{filteredTutors.length !== 1 ? "s" : ""} in your wishlist
      </p>

      {/* ✅ Sort Options */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Sort by:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="name">Name</option>
          <option value="rate">Hourly Rate</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* ✅ Tutor List */}
      <WishlistList
        tutors={filteredTutors}
        loading={loading}
        onRemove={removeFromWishlist}
      />
    </div>
  );
};

export default WishlistPage;
