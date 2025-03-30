const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const uploadRoute = require('./routes/upload'); // ✅ Your upload route

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes Integration
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/verification', require('./routes/verificationRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/upload', require('./routes/upload')); // ✅ Register here
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Basic server check route
app.get('/', (req, res) => {
  res.send('🚀 EduConnect Pakistan API is up and running!');
});

// Centralized Error handling Middleware
app.use(errorHandler);

module.exports = app;
