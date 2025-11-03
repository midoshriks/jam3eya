import { db } from "../config/db.js";
import bcrypt from "bcryptjs";

export default class User {
    constructor(id, name, phone, password, role = "user", join_date = null, is_active = 1) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.password = password;
        this.role = role;
        this.join_date = join_date;
        this.is_active = is_active;
    }

    // إنشاء مستخدم جديد
    static async create({ name, phone, password }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.query(
                "INSERT INTO users (name, phone, password) VALUES (?, ?, ?)",
                [name, phone, hashedPassword]
            );
            return new User(result.insertId, name, phone, hashedPassword);
        } catch (err) {
            throw err;
        }
    }

    // البحث عن مستخدم بالهاتف
    static async findByPhone(phone) {
        try {
            const [rows] = await db.query("SELECT * FROM users WHERE phone = ?", [phone]);
            if (rows.length === 0) return null;
            const u = rows[0];
            return new User(u.id, u.name, u.phone, u.password, u.role, u.join_date, u.is_active);
        } catch (err) {
            throw err;
        }
    }


    // التحقق من كلمة المرور
    async checkPassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    // جلب كل المستخدمين
    static async getAll() {
        const [rows] = await db.query(
            "SELECT id, name, phone, role, join_date, is_active FROM users"
        );
        return rows;
    }
}
