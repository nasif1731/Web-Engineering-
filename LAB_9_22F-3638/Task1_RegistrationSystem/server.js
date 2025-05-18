const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./studentApis'); 

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error(' MongoDB Connection Error:', err));

//  Fix: Ensure routes are prefixed correctly
app.use('/api/students', studentRoutes);

//  Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ error: ' Route Not Found' });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
