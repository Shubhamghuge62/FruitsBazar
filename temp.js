const mysql = require('mysql2');

// Create a connection to the Cloud SQL instance
const connection = mysql.createConnection({
    host: "34.69.51.10",
    user: "root",
    password: "",
    database: "ecommerce",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});