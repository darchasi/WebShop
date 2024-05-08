const { pool } = require("../db/db-connection");

module.exports = {
  get: async (req, res) => {
    try {
      const [users] = await pool.query("SELECT * FROM Users");
      res.json(users);
    } catch (error) {
      console.error("Failed to retrieve users:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports.getUserByNickname = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM Users WHERE nickName = ?", [
      req.params.nickname,
    ]);
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
