const express = require("express");
const router = express.Router();

// /blogs/:blogid
router.use("/blogs/:blogid", function (req, res) {
  res.render("users/blog-details");
});

// /blogs
router.use("/blogs", function (req, res) {
  res.render("users/blogs");
});

// /
router.use("/", function (req, res) {
  res.render("users/index");
});

module.exports = router;
