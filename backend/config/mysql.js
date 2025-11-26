const mysql = require("mysql2");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ms1098",     // put your MySQL password here
  database: "mean_db"
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error("MySQL Connection failed:", err);
    return;
  }
  console.log("MySQL connected");
});

module.exports = mysqlConnection;
