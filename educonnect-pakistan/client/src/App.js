// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context';
import { Layout } from './components/common';

// Auth
import { Login, Register } from './pages/auth';
import TutorProfileView from './pages/student/TutorProfileView';

// Student
import { StudentDashboard, TutorSearch, SessionBooking, WishlistPage } from './pages/student';

// Tutor
import { TutorDashboard, TutorProfile, SessionManagement } from './pages/tutor';

// Admin
import { AdminDashboard, TutorVerification, ReportingDashboard } from './pages/admin';

function App() {
  const { user } = useAuth();

  // 🛑 Prevent routes from rendering until auth finishes
  if (user === undefined) return null;

  return (
    <Layout>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Shared route */}
        <Route path="/tutors/:id" element={<TutorProfileView />} />

        {/* Student */}
        <Route path="/student/dashboard" element={user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />} />
        <Route path="/tutors" element={user?.role === 'student' ? <TutorSearch /> : <Navigate to="/login" />} />
        <Route path="/sessions/book" element={user?.role === 'student' ? <SessionBooking /> : <Navigate to="/login" />} />
        <Route path="/wishlist" element={user?.role === 'student' ? <WishlistPage /> : <Navigate to="/login" />} />

        {/* Tutor */}
        <Route path="/tutor/dashboard" element={user?.role === 'tutor' ? <TutorDashboard /> : <Navigate to="/login" />} />
        <Route path="/tutor/profile" element={user?.role === 'tutor' ? <TutorProfile /> : <Navigate to="/login" />} />
        <Route path="/tutor/sessions" element={user?.role === 'tutor' ? <SessionManagement /> : <Navigate to="/login" />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin/tutor-verification" element={user?.role === 'admin' ? <TutorVerification /> : <Navigate to="/login" />} />
        <Route path="/admin/reporting-dashboard" element={user?.role === 'admin' ? <ReportingDashboard /> : <Navigate to="/login" />} />

        {/* Default */}
        <Route path="/" element={<Navigate to={user ? `/${user.role}/dashboard` : '/login'} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
