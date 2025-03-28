const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const feedbackRoutes = require('./feedbackRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedbackDB')
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error(' Database Connection Error:', err));

app.use('/api/feedback', feedbackRoutes);

app.use((req, res) => res.status(404).json({ error: ' Route Not Found' }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
