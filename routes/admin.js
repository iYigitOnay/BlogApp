const express = require("express");
const router = express.Router();

router.use("/admin/blog/create", function (req, res) {
  res.render("admin/blog-create");
});

router.use("/admin/blog/:blogid", function (req, res) {
  res.render("admin/blog-edit");
});

router.use("/admin/blogs", function (req, res) {
  res.render("admin/blog-list");
});

module.exports = router;
