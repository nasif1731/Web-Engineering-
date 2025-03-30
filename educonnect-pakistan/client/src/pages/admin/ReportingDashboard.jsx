// ReportingDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '../../components/common';

const ReportingDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/reports');
        setReports(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Reporting Dashboard</h2>
      <div className="space-y-6">
        {reports.map(report => (
          <div key={report._id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold mb-2">{report.metric}</h3>
            <p><strong>Period:</strong> {report.period}</p>
            <p><strong>Date Range:</strong> {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}</p>
            <p><strong>Data:</strong> {JSON.stringify(report.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportingDashboard;
