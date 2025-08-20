const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/admin/blog/create", async function (req, res) {
  try {
    const [categories] = await db.query("SELECT * FROM category");

    res.render("admin/blog-create", {
      title: "Create Blog",
      categories, // burada çoğul kullanmak daha iyi
    });
  } catch (error) {
    console.error("Error rendering blog create page:", error);
    res.status(500).send("Sayfa yüklenirken hata oluştu.");
  }
});

router.post("/admin/blog/create", async function (req, res) {
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
  } catch (error) {
    console.error("Error inserting blog:", error);
    res.status(500).send("Blog eklenirken hata oluştu.");
  }
});
router.get("/admin/blog/:blogid", function (req, res) {
  res.render("admin/blog-edit");
});

router.get("/admin/blogs", async function (req, res) {
  try {
    const [blogs] = await db.query("SELECT blogId,title,blogimage FROM blog");
    res.render("admin/blog-list", {
      title: "Blog Listesi",
      blogs,
    });
  } catch {
    console.error("Error fetching blogs:", error);
  }
});

module.exports = router;
