require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// MongoDB Connection
require('./config/db');

// Routes
app.use('/', authRoutes);
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);

// Error Handling
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page Not Found' });
});

app.use(require('./middleware/authMiddleware').initializeSession);
app.use(require('./middleware/authMiddleware').syncRegisteredCourses);

// Update session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true, // Changed to true
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        touchAfter: 24 * 3600 // 24 hours
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
}));

const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);
const io = new Server(httpServer);

// Add after MongoDB connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('subscribe', (courseCode) => {
    socket.join(courseCode);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});