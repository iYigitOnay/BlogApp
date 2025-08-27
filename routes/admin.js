const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/admin/blog/delete/:blogid", async function (req, res) {
  const blogId = req.params.blogid;
  try {
    const [blogs] = await db.execute("SELECT * FROM blog WHERE blogId= ?", [
      blogId,
    ]);
    const blog = blogs[0];
    res.render("admin/blog-delete", {
      title: "Delete Blog",
      blog,
    });
  } catch (err) {
    console.error("Error deleting blog:", err);
  }
});

router.post("/admin/blog/delete/:blogid", async function (req, res) {
  const blogId = req.params.blogid;
  try {
    await db.execute("DELETE FROM blog WHERE blogId = ?", [blogId]);
    res.redirect("/admin/blog?action=delete");
  } catch (err) {
    console.error("Error deleting blog:", err);
  }
});

router.get("/admin/category/delete/:categoryId", async function (req, res) {
  const categoryId = req.params.categoryId;
  try {
    const [categories] = await db.execute(
      "SELECT * FROM category WHERE categoryId= ?",
      [categoryId]
    );
    const category = categories[0];
    res.render("admin/category-delete", {
      title: "Delete Category",
      category,
    });
  } catch (err) {
    console.error("Error deleting blog:", err);
  }
});

router.post("/admin/category/delete/:categoryId", async function (req, res) {
  const categoryId = req.params.categoryId;
  try {
    await db.execute("DELETE FROM category WHERE categoryId = ?", [categoryId]);
    res.redirect("/admin/category?action=delete");
  } catch (err) {
    console.error("Error deleting blog:", err);
  }
});

router.get("/admin/blog/create", async function (req, res) {
  try {
    const [categories] = await db.query("SELECT * FROM category");
    return res.render("admin/blog-create", {
      title: "Create Blog",
      categories,
    });
  } catch (err) {
    console.error("Error rendering blog create page:", err);
  }
});

router.post("/admin/blogs/create", async function (req, res) {
  const baslik = req.body.baslik;
  const aciklama = req.body.aciklama;
  const resim = req.body.resim;
  const kategori = req.body.kategori;
  const Anasayfa = req.body.Anasayfa == "on" ? 1 : 0;

  try {
    await db.execute(
      "INSERT INTO blog (title, description, blogimage, mainpage, categoryId) VALUES ( ?, ?, ?, ?, ?)",
      [baslik, aciklama, resim, Anasayfa, kategori]
    );
    return res.redirect("/admin/blogs?action=create");
  } catch (err) {
    console.error("Error inserting blog:", err);
  }
});

router.get("/admin/category/create", async function (req, res) {
  try {
    return res.render("admin/category-create", {
      title: "Create category",
    });
  } catch (err) {
    console.error("Error rendering blog create page:", err);
  }
});

router.post("/admin/category/create", async function (req, res) {
  const name = req.body.name;

  try {
    await db.execute("INSERT INTO category (categoryName) VALUES ( ?)", [name]);
    return res.redirect("/admin/categories?action=create");
  } catch (err) {
    console.error("Error inserting blog:", err);
  }
});

router.get("/admin/blogs/:blogid", async function (req, res) {
  const blogId = req.params.blogid;
  try {
    const [blogs] = await db.execute("SELECT * FROM blog WHERE blogId = ?", [
      blogId,
    ]);
    const [categories] = await db.query("SELECT * FROM category");
    const blog = blogs[0];
    if (blog) {
      return res.render("admin/blog-edit", {
        title: blog.title,
        blog,
        categories,
      });
    }
  } catch (err) {
    console.error("Error fetching blog for editing:", err);
  }
});

router.post("/admin/blogs/:blogid", async function (req, res) {
  const blogId = req.params.blogid; // Tek kaynak
  const title = req.body.title;
  const description = req.body.description;
  const blogimage = req.body.blogimage;
  const mainpage = req.body.mainpage === "on" ? 1 : 0;
  const categoryId = req.body.categoryId;

  if (!blogId) return res.status(400).send("Blog ID eksik");

  try {
    const [result] = await db.execute(
      "UPDATE blog SET title = ?, description = ?, blogimage = ?, mainpage = ?, categoryId = ? WHERE blogId = ?",
      [title, description, blogimage, mainpage, categoryId, blogId]
    );

    console.log("UPDATE result:", result);
    return res.redirect("/admin/blogs?action=edit");
  } catch (err) {
    console.error("Error updating blog:", err);
    return res.status(500).send("Update error");
  }
});

router.get("/admin/category/:categoryId", async function (req, res) {
  const categoryId = req.params.categoryId;
  try {
    const [categories] = await db.query(
      "SELECT * FROM category WHERE categoryId = ?",
      [categoryId]
    );
    const category = categories[0];
    if (category) {
      return res.render("admin/category-edit", {
        title: category.categoryName,
        category,
      });
    }
    res.redirect("/admin/categories");
  } catch (err) {
    console.error("Error fetching blog for editing:", err);
  }
});

router.post("/admin/category/:categoryId", async function (req, res) {
  const categoryId = req.params.categoryId; // tek gerçek kaynak
  const name = (req.body.name ?? "").trim(); // form input name="name"

  if (!categoryId || !name) {
    return res.status(400).send("Category name required.");
  }

  try {
    const [result] = await db.execute(
      "UPDATE category SET categoryName = ? WHERE categoryId = ?",
      [name, categoryId]
    );

    return res.redirect(
      "/admin/categories?action=edit&categoryId=" + categoryId
    );
  } catch (err) {
    console.error("Error updating category:", err);
    return res.status(500).send("Category update error");
  }
});

router.get("/admin/blogs", async function (req, res) {
  try {
    const [blogs] = await db.query("SELECT blogId,title,blogimage FROM blog");
    res.render("admin/blog-list", {
      title: "Blog Listesi",
      blogs,
      action: req.query.action,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
  }
});

router.get("/admin/categories", async function (req, res) {
  try {
    const [categories] = await db.query("SELECT* FROM category");
    res.render("admin/category-list", {
      title: "Blog Listesi",
      categories,
      action: req.query.action,
      categoryId: req.query.categoryId,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
  }
});

module.exports = router;
