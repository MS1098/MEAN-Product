const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysqlConnection = require("../config/mysql");

const JWT_SECRET = "SECRET"; 

// USER REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  mysqlConnection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (results.length > 0) return res.status(400).json({ message: "Username already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      mysqlConnection.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err) => {
          if (err) return res.status(500).json({ message: "Error registering user" });
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    }
  );
});

// USER LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  mysqlConnection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (results.length === 0) return res.status(400).json({ message: "User not found" });

      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) return res.status(401).json({ message: "Invalid password" });

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
    }
  );
});

module.exports = router;
