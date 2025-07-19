const express = require("express");

const app = express();

app.use("/blog", function (req, res) {
  console.log("About route accessed");
  res.send("<html><body><h1>About Page</h1></body></html>");
});

app.use("/blog/1128", function (req, res) {
  console.log("Blog post 1128 accessed");
  res.send("<html><body><h1>Blog Post 1128</h1></body></html>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
