const express = require("express");
const path = require("path");
const app = express();

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/blogs/:blogid", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "users", "blog-details.html"));
});

app.use("/blogs", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "users", "blogs.html"));
});

app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "users", "index.html"));
});

// Start the server

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
