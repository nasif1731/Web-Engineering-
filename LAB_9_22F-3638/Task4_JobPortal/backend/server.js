const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./jobRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/jobPortal')
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error(' Database Connection Error:', err));


app.use('/api', jobRoutes);

app.use((req, res) => res.status(404).json({ error: '❌ Route Not Found' }));


const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
