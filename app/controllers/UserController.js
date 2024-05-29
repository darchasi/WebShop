const { validateUser } = require("../models/UserModel");
const { pool } = require("../db/db-connection");
const crypto = require("crypto");

module.exports.getAll = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT useId,usefirstName,uselastName, usenickName FROM t_User"
    );
    res.json({ data: users });
  } catch (error) {
    const message = "Failed to retrieve users:";
    console.error({ msg: message, data: error });
    const Publicmessage = "Internal Server Error";
    res.status(500).send({ msg: Publicmessage });
  }
};
module.exports.getUserByNickname = async (req, res) => {
  try {
    const nickname = req.params.nickname;
    const [users] = await pool.query(
      "SELECT useId,usefirstName,uselastName, usenickName FROM t_User WHERE usenickName LIKE ?",
      [`%${nickname}%`]
    );
    if (users.length === 0) {
      const message = "User not found";
      return res.status(404).send({ msg: message });
    }
    return res.json({ data: users });
  } catch (error) {
    const message = "Failed to retrieve user by nickname:";
    console.error({ msg: message, data: error });
    const Publicmessage = "Internal Server Error";
    res.status(500).send({ msg: Publicmessage });
  }
};

function generateSalt(nickName) {
  return crypto.createHash("sha256").update(nickName).digest("hex");
}

async function hashPassword(password, salt) {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
}

module.exports.addUser = async (req, res) => {
  const user = req.body;

  const errors = validateUser(user);
  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }

  const sql = `INSERT INTO t_User (usefirstName, uselastName, usenickName, usepassword, usesalt, useisAdmin) VALUES (?, ?, ?, ?, ?, ?)`;

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const salt = generateSalt(user.nickName);
    const hashedPassword = await hashPassword(user.password, salt);

    const [result] = await conn.query(sql, [
      user.firstName,
      user.lastName,
      user.nickName,
      hashedPassword,
      salt,
      user.isAdmin,
    ]);

    await conn.commit();
    const message = "User successfully added";
    return res.status(201).json({ msg: message, data: result });
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }
    const message = "Failed to insert user: ";
    return res.status(500).json({ msg: message, data: error.message });
  } finally {
    if (conn) {
      conn.release();
    }
  }
};
