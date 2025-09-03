const mysql = require("mysql2");
const config = require("../config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  { dialect: "mysql", host: config.db.host }
);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

connect();
module.exports = sequelize;

// Database connection
// let connection = mysql.createConnection(config.db);

// connection.connect(function (err) {
//   if (err) {
//     return console.log("Error connecting to the database: " + err.stack);
//   }

//   console.log("Connected to the database as id " + connection.threadId);
// });

// module.exports = connection.promise();

//promises, async/await, or callbacks can be used to handle database queries
