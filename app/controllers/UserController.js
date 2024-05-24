const { pool } = require("../db/db-connection");

module.exports.getAll = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM t_User");
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
      "SELECT * FROM t_User WHERE usenickName LIKE ?",
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
/*
const addUser = async (user) => {
  const errors = validateUser(user);
  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }

  `INSERT INTO t_User (usefirstName, uselastName, usenickName, usepassword, useisAdmin) VALUES (?, ?, ?, ?, ?)`;
  try {
    const [result] = await db.query(sql, [
      user.firstName,
      user.lastName,
      user.nickName,
      user.password,
      user.isAdmin,
    ]);
    return result;
  } catch (error) {
    throw new Error("Failed to insert user: " + error.message);
  }
};

*/
