const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "product_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.post("/api/products", (req, res) => {
  const { product_name, category, price } = req.body;
  db.query(
    "INSERT INTO products (product_name, category, price) VALUES (?, ?, ?)",
    [product_name, category, price],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Product added successfully!" });
    }
  );
});

app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
});

app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const { product_name, category, price } = req.body;
  
    const sql = "UPDATE products SET product_name = ?, category = ?, price = ? WHERE id = ?";
    db.query(sql, [product_name, category, price, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Product updated successfully!" });
    });
});

app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Product deleted successfully!" });
    });
});

app.get("/api/check-email", (req, res) => {
    const { email } = req.query;
  
    const sql = "SELECT * FROM students WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (result.length > 0) {
        res.json({ exists: true, message: "Email already registered!" });
      } else {
        res.json({ exists: false });
      }
    });
});
  
  // Register a New Student
  app.post("/api/register", (req, res) => {
    const { name, email, password } = req.body;
  
    const sql = "INSERT INTO students (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      res.json({ message: "Registration successful!" });
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
  
    const sql = "SELECT * FROM students WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (result.length > 0) {
        res.json({ success: true, message: "Login successful!" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    });
});
  
  
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));