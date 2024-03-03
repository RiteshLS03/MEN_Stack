const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "rites",
  password: "addd",
  database: "mydb",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL");
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// CRUD operations

// Create
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) throw err;
      res.send("User added successfully");
    }
  );
});

// Read
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  db.query(
    "UPDATE users SET name=?, email=? WHERE id=?",
    [name, email, userId],
    (err, result) => {
      if (err) throw err;
      res.send("User updated successfully");
    }
  );
});

// Delete
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id=?", [userId], (err, result) => {
    if (err) throw err;
    res.send("User deleted successfully");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
