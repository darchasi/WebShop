const { pool } = require("../db/db-connection");

module.exports = {
  get: async (req, res) => {
    try {
      const [users] = await pool.query("SELECT * FROM t_User");
      res.json(users);
    } catch (error) {
      console.error("Failed to retrieve users:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports.getUserByNickname = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT * FROM t_User WHERE usenickName = ?",
      [req.params.nickname]
    );
    const user = users[0];
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.json(user);
  } catch (error) {
    console.error("Failed to retrieve user by nickname:", error);
    res.status(500).send("Internal Server Error");
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
