const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Start Express Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 EduConnect server started at: http://localhost:${PORT}`);
});
