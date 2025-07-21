const express = require("express");
const router = express.Router();

const data = {
  title: "Popular Blogs",
  catagories: ["Technology", "Health", "Lifestyle", "Travel", "Food"],
};

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
  res.render("users/index", data);
});

module.exports = router;
