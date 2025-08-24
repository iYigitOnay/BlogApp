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
    res.redirect("/admin/blogs");
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
    return res.redirect("/admin/blogs");
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
  const blogId = req.body.blogid;
  const baslik = req.body.baslik;
  const aciklama = req.body.aciklama;
  const resim = req.body.resim;
  const Anasayfa = req.body.Anasayfa == "on" ? 1 : 0;
  const kategori = req.body.kategori;

  try {
    await db.execute(
      "UPDATE blog SET title = ?, description = ?, blogimage = ?, mainpage = ?, categoryId = ? WHERE blogId = ?"[
        (baslik, aciklama, resim, Anasayfa, kategori, blogId)
      ]
    );
    console.log("Blog güncellendi:", blogId);
    console.log("Başlık:", baslik);
    console.log("Açıklama:", aciklama);
    console.log("Resim:", resim);
    console.log("Anasayfa:", Anasayfa);
    console.log("Kategori:", kategori);

    res.redirect("/admin/blogs");
  } catch {
    console.error("Error updating blog:", err);
  }
});

router.get("/admin/blogs", async function (req, res) {
  try {
    const [blogs] = await db.query("SELECT blogId,title,blogimage FROM blog");
    res.render("admin/blog-list", {
      title: "Blog Listesi",
      blogs,
    });
  } catch {
    console.error("Error fetching blogs:", err);
  }
});

module.exports = router;
