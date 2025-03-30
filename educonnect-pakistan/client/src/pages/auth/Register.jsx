// Register.jsx
import React, { useState } from 'react';
import { Button, Input, ErrorMessage } from '../../components/common';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
        </select>

        {error && <ErrorMessage message={error} />}

        <Button type="submit">Register</Button>
        <p className="text-sm mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-brown-700 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
