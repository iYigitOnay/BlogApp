const express = require("express");
const path = require("path");
const router = express.Router();

router.use("/admin/blog/create", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/admin", "blog-create.html"));
});

router.use("/admin/blog/:blogid", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/admin", "blog-edit.html"));
});

router.use("/admin/blogs", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/admin", "blog-list.html"));
});

module.exports = router;
