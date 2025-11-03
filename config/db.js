import mysql from "mysql2/promise";

// الاتصال بقاعدة البيانات باستخدام متغيرات البيئة
export const connectDB = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT || 3306,
    });

    console.log("✅ Connected to MySQL");
    return db;
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1); // إنهاء السيرفر إذا فشل الاتصال
  }
};




// // config/db.js
// import mysql from "mysql2/promise";

// // إنشاء الاتصال كـ Promise
// export const db = await mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "jam3eya"
// });

// console.log("✅ Connected to MySQL (Promise version)");

