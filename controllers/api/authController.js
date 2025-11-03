import User from "../../models/userModel.js";

// تسجيل مستخدم جديد (API)
export const apiRegisterUser = async (req, res) => {
    const { name, phone, password } = req.body;
    try {
        const existingUser = await User.findByPhone(phone);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "📛 الهاتف موجود بالفعل" });
        }

        const user = await User.create({ name, phone, password });
        res.status(201).json({
            success: true,
            message: "✅ تم إنشاء الحساب بنجاح",
            user: { id: user.id, name: user.name, phone: user.phone }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "❌ خطأ في السيرفر" });
    }
};

// تسجيل الدخول (API)
export const apiLoginUser = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await User.findByPhone(phone);
        if (!user) {
            return res.status(404).json({ success: false, message: "📛 الهاتف غير مسجل" });
        }

        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "📛 كلمة المرور غير صحيحة" });
        }

        res.json({
            success: true,
            message: `✅ مرحبًا ${user.name}`,
            user: { id: user.id, name: user.name, phone: user.phone }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "❌ خطأ في السيرفر" });
    }
};

// جلب جميع المستخدمين (اختياري)
export const apiGetUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json({ success: true, users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "❌ خطأ في السيرفر" });
    }
};
