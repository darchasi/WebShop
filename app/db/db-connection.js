const mysql = require("mysql2/promise");
<<<<<<< HEAD:db/db-connection.js
const crypto = require("crypto");
=======
>>>>>>> c5dad273eb1f76c1428e530aeda2963fc81c6b91:app/db/db-connection.js

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_WebShop",
  port: 6033,
});

<<<<<<< HEAD:db/db-connection.js
function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

async function hashPassword(password, salt) {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
=======
const crypto = require("crypto");
async function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
>>>>>>> c5dad273eb1f76c1428e530aeda2963fc81c6b91:app/db/db-connection.js
}

async function insertUsers(users) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    for (const user of users) {
      const { firstName, lastName, nickName, password, isAdmin } = user;
<<<<<<< HEAD:db/db-connection.js
      const salt = generateSalt();
      const hashedPassword = await hashPassword(password, salt);

      const sql = `INSERT INTO t_User (usefirstName, uselastName, usenickName, usepassword, usesalt, useisAdmin) VALUES (?, ?, ?, ?, ?, ?)`;
=======
      const hashedPassword = await hashPassword(password); // Hashea la contraseña antes de insertarla

      const sql = `INSERT INTO t_User (usefirstName, uselastName, usenickName, usepassword, useisAdmin) VALUES (?, ?, ?, ?, ?)`;
>>>>>>> c5dad273eb1f76c1428e530aeda2963fc81c6b91:app/db/db-connection.js
      await conn.execute(sql, [
        firstName,
        lastName,
        nickName,
<<<<<<< HEAD:db/db-connection.js
        hashedPassword,
        salt,
=======
        hashedPassword, // Usa la contraseña hasheada
>>>>>>> c5dad273eb1f76c1428e530aeda2963fc81c6b91:app/db/db-connection.js
        isAdmin,
      ]);
    }

    await conn.commit();
    console.log("Users have been successfully inserted.");
  } catch (error) {
    console.error("Error inserting users:", error);
    await conn.rollback();
  } finally {
    conn.release();
  }
}

const users = require("./mock-users");

insertUsers(users).catch((error) => {
  console.error("Failed to insert users:", error);
});

module.exports = { pool, insertUsers };
