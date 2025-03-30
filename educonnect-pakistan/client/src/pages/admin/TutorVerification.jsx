// TutorVerification.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Loader } from '../../components/common';

const TutorVerification = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/verification');
      // ✅ Filter out requests with missing tutor
      setRequests(data.filter(req => req.tutor));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (id, status) => {
    try {
      await axios.put(`/api/verification/${id}`, { status });
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Tutor Verification</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Qualifications</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id}>
              <td className="border p-2">{req.tutor?.name || "Unknown"}</td>
              <td className="border p-2">{req.tutor?.qualifications || "N/A"}</td>
              <td className="border p-2 capitalize">{req.status}</td>
              <td className="border p-2 space-x-2">
                {req.status === 'pending' && (
                  <>
                    <Button onClick={() => handleVerification(req._id, 'approved')}>Approve</Button>
                    <Button onClick={() => handleVerification(req._id, 'rejected')}>Reject</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TutorVerification;
