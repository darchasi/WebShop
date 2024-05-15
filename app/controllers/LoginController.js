const { pool } = require("../db/db-connection");
const jwt = require("jsonwebtoken");
const { privateKey } = require("../auth/private_key.js");
const crypto = require("crypto");

module.exports.login = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM t_User WHERE usenickName = ?",
      [req.body.nickName]
    );
    const user = rows[0];
    if (!user) {
      const message = "L'utilisateur demandé n'existe pas";
      return res.status(404).json({ message });
    }
    const hashedPassword = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");

    if (hashedPassword !== user.password) {
      const message = "Le mot de passe est incorrecte.";
      return res.status(401).json({ message });
    } else {
      const token = jwt.sign({ userId: user.id }, privateKey, {
        expiresIn: "1y",
      });
      const message = "L'utilisateur a été connecté avec succès";
      return res.json({ message, data: user, token });
    }
  } catch (error) {
    const message =
      "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants";
    return res.status(500).json({ message, data: error });
  }
};
