const express = require("express");
const path = require("path");
const app = express();
const route = require("./routes/user.js");
const adminRoute = require("./routes/admin.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

console.log(app.get("view engine"));

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(adminRoute);
app.use(route);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
