// AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-semibold">Admin Dashboard</h2>

    <section>
      <h3 className="text-xl font-semibold mb-4">Quick Access</h3>
      <ul className="list-disc ml-6">
        <li><Link className="text-blue-500 hover:underline" to="/admin/tutor-verification">Tutor Verification</Link></li>
        <li><Link className="text-blue-500 hover:underline" to="/admin/reporting-dashboard">Reporting Dashboard</Link></li>
      </ul>
    </section>
  </div>
);

export default AdminDashboard;
