const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./productRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/productDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(' Database Connection Error:', err));

app.use('/api/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
