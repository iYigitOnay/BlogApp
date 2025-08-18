const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.use("/admin/blog/create", function (req, res) {
  
  res.render("admin/blog-create", {
    title: "Create Blog",
  });
});

router.use("/admin/blog/:blogid", function (req, res) {
  res.render("admin/blog-edit");
});

router.use("/admin/blogs", function (req, res) {
  res.render("admin/blog-list");
});

module.exports = router;
