// import express from "express";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";

// import authRoutes from "./routes/auth.js";
// import authApiRoutes from "./routes/api/authApi.js";
// import { connectDB } from "./config/db.js";

// dotenv.config(); // تحميل متغيرات البيئة

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ربط روتات API للمصادقة
// app.use("/api/auth", authApiRoutes);

// // إعداد EJS كـ view engine
// app.set("view engine", "ejs");
// app.set("views", "./views");

// // ربط روتات المصادقة
// app.use("/auth", authRoutes);

// // صفحة رئيسية بسيطة
// app.get("/", (req, res) => {
//     res.render("index", { title: "الصفحة الرئيسية" });
// });

// // بدء السيرفر بعد الاتصال بالـ DB
// const PORT = process.env.PORT || 3000;

// const startServer = async () => {
//     try {
//         const db = await connectDB();
//         // إذا أردت، يمكن تصدير `db` للاستخدام في موديلاتك
//         app.locals.db = db;

//         app.listen(PORT, () => {
//             console.log(`Server running at http://localhost:${PORT}`);
//         });
//     } catch (err) {
//         console.error("❌ فشل تشغيل السيرفر:", err);
//     }
// };

// startServer();


//  server.js local file

import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import authApiRoutes from "./routes/api/authApi.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ربط روتات API للمصادقة
app.use("/api/auth", authApiRoutes);




// إعداد EJS كـ view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// ربط روتات المصادقة
app.use("/auth", authRoutes);

// صفحة رئيسية بسيطة
app.get("/", (req, res) => {
    res.render("index", { title: "الصفحة الرئيسية" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
