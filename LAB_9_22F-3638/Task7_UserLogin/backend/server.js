const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/userDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

app.use("/api", authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
