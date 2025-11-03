import { db } from "./config/db.js"; // تأكد أن db عبارة عن mysql2/promise connection

// تعريف الجداول
const tables = [
  // جدول المستخدمين
  `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1
  );

  `,

  // جدول الجمعيات
  `
    CREATE TABLE IF NOT EXISTS jam3eyat (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      total_members INT NOT NULL,
      start_date DATE NOT NULL,
      admin_id INT,
      FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `,

  // جدول المشاركين في الجمعية
  `
    CREATE TABLE IF NOT EXISTS jam3eya_members (
      id INT AUTO_INCREMENT PRIMARY KEY,
      jam3eya_id INT NOT NULL,
      user_id INT NOT NULL,
      round_number INT NOT NULL,
      has_received TINYINT(1) DEFAULT 0,
      FOREIGN KEY (jam3eya_id) REFERENCES jam3eyat(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `,

  // جدول المدفوعات
  `
    CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      member_id INT NOT NULL,
      month VARCHAR(20) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      paid_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (member_id) REFERENCES jam3eya_members(id) ON DELETE CASCADE
    );
  `
];

// دالة لإنشاء جميع الجداول
async function createTables() {
  try {
    for (let i = 0; i < tables.length; i++) {
      await db.query(tables[i]);
      console.log(`✅ Table #${i + 1} created or already exists.`);
    }
    console.log("🎉 Database migration completed successfully!");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
  } finally {
    await db.end();
  }
}

// تنفيذ الدالة
createTables();


