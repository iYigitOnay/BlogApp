const express = require("express");

const app = express();

app.use("/blog/1128", function (req, res, next) {
  console.log("Blog post 1128 accessed");
  res.send("<html><body><h1>Blog Post 1128</h1></body></html>");
  next();
});

app.use("/blog", function (req, res, next) {
  console.log("About route accessed");
  res.send("<html><body><h1>Blog Page</h1></body></html>");
  next();
});

app.use("/", function (req, res) {
  console.log("Home route accessed");
  res.send("<html><body><h1>Home Page</h1></body></html>");
});

// Start the server

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
