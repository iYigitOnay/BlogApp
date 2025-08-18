const express = require("express");
const router = express.Router();
const db = require("../data/db.js");

const data = {
  title: "Popular Blogs",
  categories: ["Blogs", "Health", "Lifestyle", "Travel", "Food"],
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
router.use("/blogs/:blogid", async function (req, res) {
  const blogId = req.params.blogid;
  try {
    const [blog] = await db.execute("SELECT * FROM blog WHERE blogId = ?", [
      blogId,
    ]);

    res.render("users/blog-details", {
      title: blog[0].title,
      blog: blog[0],
    });
  } catch (err) {
    console.error("Error fetching blog details:", err);
  }
});

// /blogs
router.use("/blogs", async function (req, res) {
  try {
    const [blogs] = await db.execute("SELECT * FROM blog");
    const [categories] = await db.execute("SELECT * FROM category");
    res.render("users/blogs", {
      title: "Tüm Kurslar",
      blogs: blogs,
      categories: categories,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
  }
});

// /
router.use("/", async function (req, res) {
  try {
    const [blogs] = await db.execute(
      "SELECT * FROM blog WHERE mainpage = true"
    );
    const [categories] = await db.execute("SELECT * FROM category");
    res.render("users/blogs", {
      title: "Ana Sayfa",
      blogs: blogs,
      categories: categories,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
  }
});

module.exports = router;
