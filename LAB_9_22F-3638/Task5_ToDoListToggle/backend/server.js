const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./todoRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

app.use("/api/todos", todoRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
