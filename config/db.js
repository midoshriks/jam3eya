import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
});

console.log("✅ Connected to MySQL");





// // // config/db.js
// import mysql from "mysql2/promise";

// // إنشاء الاتصال كـ Promise
// export const db = await mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "jam3eya"
// });

// console.log("✅ Connected to MySQL (Promise version)");

