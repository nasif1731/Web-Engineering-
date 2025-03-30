import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [cacheBust, setCacheBust] = useState(Date.now());

  useEffect(() => {
    const handler = () => setCacheBust(Date.now());
    window.addEventListener("profileUpdated", handler);
    return () => window.removeEventListener("profileUpdated", handler);
  }, []);

  const [wishlistCount, setWishlistCount] = useState(0);
  useEffect(() => {
    const updateWishlistCount = () => {
      const list = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(list.length);
    };

    updateWishlistCount();
    window.addEventListener("wishlistUpdated", updateWishlistCount);
    return () => window.removeEventListener("wishlistUpdated", updateWishlistCount);
  }, []);

  const profileImage = user?.profilePicture?.trim()
    ? `${user.profilePicture}?v=${cacheBust}`
    : '/images/default-profile.png';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="EduConnect Logo" className="h-10 w-auto" />
        </Link>

        <div className="nav-links items-center flex gap-6">
          {user?.role === 'student' && (
            <>
              <Link to="/tutors">Find Tutors</Link>
              <Link to="/sessions/book">Book a Session</Link>
              <Link to="/wishlist">
                Wishlist{" "}
                <span className="text-sm ml-1 text-white bg-red-500 px-2 rounded-full">
                  ❤️ {wishlistCount}
                </span>
              </Link>
            </>
          )}

          {user?.role === 'tutor' && (
            <>
              <Link to="/tutor/dashboard">Dashboard</Link>
              <Link to="/tutor/profile">Profile</Link>
              <Link to="/tutor/sessions">Sessions</Link>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/admin/tutor-verification">Verify Tutors</Link>
              <Link to="/admin/reporting-dashboard">Reports</Link>
            </>
          )}

          {user ? (
            <>
              <img
                src={profileImage}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover border border-white"
              />
              <button className="logout-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="primary-btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
