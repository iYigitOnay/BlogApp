const mysql = require("mysql2");
const config = require("../config.js");

// Database connection
let connection = mysql.createConnection(config.db);

connection.connect(function (err) {
  if (err) {
    return console.log("Error connecting to the database: " + err.stack);
  }

  console.log("Connected to the database as id " + connection.threadId);
});

module.exports = connection.promise();

//promises, async/await, or callbacks can be used to handle database queries
