const express = require("express");

const app = express();

app.use("/blog/:blogid/users/:userid", function (req, res) {
  console.log(
    "User route accessed for blog ID:",
    req.params.blogid,
    "and user ID:",
    req.params.userid
  );
  res.send("<html><body><h1>Blog Post 1128</h1></body></html>");
});

app.use("/blog", function (req, res) {
  res.send("<html><body><h1>Blog Page</h1></body></html>");
});

app.use("/", function (req, res) {
  res.send("<html><body><h1>Home Page</h1></body></html>");
});

// Start the server

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
