
# 🛠️ BlogApp - Dinamik Blog Uygulaması (Alıştırma Projesi)

Bu proje, Node.js + Express.js + MySQL kullanarak geliştirilen temel bir blog uygulamasıdır. Ana hedefim, yaklaşmakta olan **MAKUtalk** projesi öncesinde kendimi pratikle geliştirmekti.

> **Not:** Bu proje bir *ön çalışma* / *prototip* olup gerçek kullanıcıya açık değildir.

## 🎯 Amaç

- Back-end geliştirme pratiği yapmak
- EJS ile şablon yönetimini öğrenmek
- Modüler yapı, route ve veritabanı mantığını yerleştirmek
- Dinamik içerik listeleme, oluşturma, silme, güncelleme gibi işlemleri deneyimlemek

## ⚙️ Özellikler

- 📝 Blog yazıları: Ekleme, güncelleme, silme
- 📂 Kategorilere göre filtreleme
- 🧱 MySQL veritabanı bağlantısı (config.js)
- 💡 EJS ile sayfa şablonları ve partial kullanımı (nav, head, vs.)
- 🔄 Sayfalama (pagination)
- 👨‍💻 Admin ve user route'ları ayrı

## 📁 Klasör Yapısı

```
BlogApp/
├── config/
│   └── config.js
├── routes/
│   ├── user.js
│   └── admin.js
├── views/
│   ├── partials/
│   └── [tüm ejs sayfaları]
├── index.js
├── public/
├── package.json
```

## 🔌 Kurulum

1. Repoyu klonla  
```bash
git clone https://github.com/kullaniciadi/BlogApp.git
```

2. Bağımlılıkları yükle  
```bash
npm install
```

3. MySQL ayarlarını `config/config.js` içinde düzenle  
```js
module.exports = {
  host: "localhost",
  user: "root",
  password: "",
  database: "blogdb"
};
```

4. Uygulamayı çalıştır  
```bash
node index.js
```

## 💾 Veritabanı (örnek şema)

```sql
CREATE TABLE category (
  categoryId INT AUTO_INCREMENT PRIMARY KEY,
  categoryName VARCHAR(255) NOT NULL
);

CREATE TABLE blog (
  blogId INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  categoryId INT,
  FOREIGN KEY (categoryId) REFERENCES category(categoryId)
);
```

## ✍️ Geliştirici

- **İhsan Yiğit Önay**  
  Mehmet Akif Ersoy Üniversitesi - Yazılım Mühendisliği  
  GitHub: [@yigitonay](https://github.com/yigitonay)
