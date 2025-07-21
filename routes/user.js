const express = require("express");
const router = express.Router();

const data = {
  title: "Popular Blogs",
  catagories: ["Blogs", "Health", "Lifestyle", "Travel", "Food"],
  blogs: [
    {
      blogId: "1",
      title: "The Future of AI",
      description: "Exploring the advancements in artificial intelligence.",
      blogimage: "1.jpg",
      mainpage: true,
    },
    {
      blogId: "2",
      title: "Healthy Living",
      description: "Tips and tricks for a healthier lifestyle.",
      blogimage: "2.jpg",
      mainpage: true,
    },
    {
      blogId: "3",
      title: "Traveling the World",
      description: "A guide to the best travel destinations.",
      blogimage: "3.png",
      mainpage: false,
    },
    {
      blogId: "4",
      title: "Culinary Delights",
      description: "Exploring the world of food and recipes.",
      blogimage: "4.jpg",
      mainpage: true,
    },
  ],
};

// /blogs/:blogid
router.use("/blogs/:blogid", function (req, res) {
  res.render("users/blog-details");
});

// /blogs
router.use("/blogs", function (req, res) {
  res.render("users/blogs", data);
});

// /
router.use("/", function (req, res) {
  res.render("users/index", data);
});

module.exports = router;
