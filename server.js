// تحميل dotenv لقراءة المتغيرات من ملف .env
require('dotenv').config();

// تحميل الحزم اللازمة
const express = require('express');
const multer = require('multer');
const OpenAI = require('openai');
const app = express();
const port = 3000;

// إعداد OpenAI باستخدام المفتاح من المتغيرات البيئية
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // هنا يلتقط المفتاح من ملف .env
});

// إعداد multer للتعامل مع رفع الملفات
const upload = multer();

// إعداد مسار للتفاعل مع API OpenAI
app.post('/ask', upload.single('file'), async (req, res) => {
  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: req.body.text,
      max_tokens: 100,
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('حدث خطأ');
  }
});

// تشغيل الخادم على البورت 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
