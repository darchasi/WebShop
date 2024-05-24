const mysql = require("mysql2/promise");
const crypto = require("crypto");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_WebShop",
  port: 6033,
});

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

async function hashPassword(password, salt) {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
}

async function insertUsers(users) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    for (const user of users) {
      const { firstName, lastName, nickName, password, isAdmin } = user;
      const salt = generateSalt();
      const hashedPassword = await hashPassword(password, salt);

      const sql = `INSERT INTO t_User (usefirstName, uselastName, usenickName, usepassword, usesalt, useisAdmin) VALUES (?, ?, ?, ?, ?, ?)`;
      await conn.execute(sql, [
        firstName,
        lastName,
        nickName,
        hashedPassword,
        salt,
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
