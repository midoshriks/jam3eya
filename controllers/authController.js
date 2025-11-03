import User from "../models/userModel.js";

// صفحات الويب
export const showLogin = (req, res) => {
    res.render("auth/login", { title: "تسجيل الدخول", error: null });
};

export const showRegister = (req, res) => {
    res.render("auth/register", { title: "إنشاء حساب جديد", error: null });
};

// تسجيل المستخدم
export const registerUser = async (req, res) => {
    const { name, phone, password } = req.body;
    try {
        const existingUser = await User.findByPhone(phone);
        if (existingUser) return res.render("auth/register", { title: "إنشاء حساب جديد", error: "📛 الهاتف موجود بالفعل" });

        const user = await User.create({ name, phone, password });
        res.redirect("/auth/login");
    } catch (err) {
        console.error(err);
        res.render("auth/register", { title: "إنشاء حساب جديد", error: "❌ خطأ في السيرفر" });
    }
};

// تسجيل الدخول
export const loginUser = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await User.findByPhone(phone);
        if (!user) return res.render("auth/login", { title: "تسجيل الدخول", error: "📛 الهاتف غير مسجل" });

        const isMatch = await user.checkPassword(password);
        if (!isMatch) return res.render("auth/login", { title: "تسجيل الدخول", error: "📛 كلمة المرور غير صحيحة" });

        // بعد تسجيل الدخول نعرض صفحة المستخدمين
        const users = await User.getAll();
        res.render("users", { title: "المستخدمين", users });
    } catch (err) {
        console.error(err);
        res.render("auth/login", { title: "تسجيل الدخول", error: "❌ خطأ في السيرفر" });
    }
};











// import User from "../models/userModel.js";

// // عرض صفحة تسجيل الدخول
// export const showLogin = (req, res) => {
//     res.render("auth/login", { title: "تسجيل الدخول" });
// };

// // تسجيل الدخول
// export const loginUser = async (req, res) => {
//     const { phone, password } = req.body;
//     try {
//         const user = await User.findByPhone(phone);
//         if (!user) return res.send("📛 الهاتف غير مسجل");

//         const isMatch = await user.checkPassword(password);
//         if (!isMatch) return res.send("📛 كلمة المرور غير صحيحة");

//         res.send(`✅ مرحبًا ${user.name}`);
//     } catch (err) {
//         console.error(err);
//         res.send("❌ خطأ في السيرفر");
//     }
// };

// // عرض صفحة التسجيل
// export const showRegister = (req, res) => {
//     res.render("auth/register", { title: "إنشاء حساب جديد" });
// };

// // التسجيل
// export const registerUser = async (req, res) => {
//     const { name, phone, password } = req.body;
//     try {
//         const existingUser = await User.findByPhone(phone);
//         if (existingUser) return res.send("📛 الهاتف موجود بالفعل");

//         const user = await User.create({ name, phone, password });
//         res.send(`✅ تم إنشاء الحساب: ${user.name}`);
//     } catch (err) {
//         console.error(err);
//         res.send("❌ خطأ في السيرفر");
//     }
// };



