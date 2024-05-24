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
const { addUser } = require("./models/UserModel");
app.post("/users", async (req, res) => {
  try {
    const result = await addUser(req.body);
    res.status(201).send({ message: "User created", data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
*/
