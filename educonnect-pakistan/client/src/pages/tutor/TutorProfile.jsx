import React, { useEffect, useState } from 'react';
import { Button, Input, ErrorMessage } from '../../components/common';
import axios from 'axios';
import { useAuth } from '../../context';

const TutorProfile = () => {
  const { user, setUser } = useAuth();
  const tutorId = user?._id;

  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    qualifications: '',
    hourlyRate: '',
    subjects: '',
    location: '',
    profilePicture: '',
  });

  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!tutorId) return;
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/api/users/profile/${tutorId}`);
        setProfile({
          ...data,
          subjects: data.subjects?.join(', ') || '',
        });
        setPreview(data.profilePicture);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [tutorId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedImageUrl = profile.profilePicture;

      // 1️⃣ If a new image is selected, upload it first
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const { data } = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedImageUrl = data.url;
      }

      // 2️⃣ Update profile with new data + image URL
      const { data: updatedUser } = await axios.put(`/api/users/profile/${tutorId}`, {
        ...profile,
        profilePicture: uploadedImageUrl,
        subjects: profile.subjects.split(',').map((sub) => sub.trim()),
      });

      // 3️⃣ Update global user context and show success
      setUser((prev) => ({ ...prev, profilePicture: updatedUser.profilePicture }));
      window.dispatchEvent(new Event("profileUpdated")); // 🧠 Notify UI
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (error) {
      console.error(error);
      setError('Profile update failed.');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>

      {/* 🖼️ Current Profile Picture */}
      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" label="Full Name" value={profile.name} onChange={handleChange} required />
        <Input name="bio" label="Bio" value={profile.bio} onChange={handleChange} required />
        <Input name="qualifications" label="Qualifications" value={profile.qualifications} onChange={handleChange} required />
        <Input name="hourlyRate" label="Hourly Rate" type="number" value={profile.hourlyRate} onChange={handleChange} required />
        <Input name="subjects" label="Subjects (comma-separated)" value={profile.subjects} onChange={handleChange} required />
        <Input name="location" label="Location" value={profile.location} onChange={handleChange} required />

        {/* 📤 Upload new profile image */}
        <div className="flex flex-col">
          <label className="font-semibold text-sm">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {error && <ErrorMessage message={error} />}
        {success && <p className="text-green-600 font-medium">{success}</p>}

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default TutorProfile;
