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
