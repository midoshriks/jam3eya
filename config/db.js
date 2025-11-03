// config/db.js
import mysql from "mysql2/promise";

// إنشاء الاتصال كـ Promise
export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jam3eya"
});

console.log("✅ Connected to MySQL (Promise version)");


// config/db.js

// import mysql from "mysql2";

// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "jam3eya"
// });

// db.connect(err => {
//     if (err) throw err;
//     console.log("✅ Connected to MySQL");
// });

// // نسخة Promises
// export const dbPromise = db.promise();
