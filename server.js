const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

// إعداد Multer لحفظ الملفات في مجلد معين
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// نقطة النهاية لاستقبال الرسائل والملفات
app.post("/chat", upload.single("file"), (req, res) => {
  const userMessage = req.body.message;
  const file = req.file;

  console.log("الرسالة:", userMessage);
  console.log("الملف:", file ? file.filename : "لا يوجد ملف");

  // هنا يمكنك إضافة معالجة الرد من الذكاء الاصطناعي
  const aiResponse = "تم استلام رسالتك";

  res.json({ reply: aiResponse });
});

app.listen(3000, () => {
  console.log("الخادم يعمل على http://localhost:3000");
});
