const express = require("express");

const app = express();

app.use(function (req, res) {
  res.end("Home Page!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
