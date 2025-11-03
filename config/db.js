import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log("✅ Connected to MySQL (Railway)");


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

