const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_WebShop",
  port: 6033,
});

const crypto = require("crypto");
async function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function insertUsers(users) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    for (const user of users) {
      const { firstName, lastName, nickName, password, isAdmin } = user;
      const hashedPassword = await hashPassword(password); // Hashea la contraseña antes de insertarla

      const sql = `INSERT INTO t_User (usefirstName, uselastName, usenickName, usepassword, useisAdmin) VALUES (?, ?, ?, ?, ?)`;
      await conn.execute(sql, [
        firstName,
        lastName,
        nickName,
        hashedPassword, // Usa la contraseña hasheada
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
