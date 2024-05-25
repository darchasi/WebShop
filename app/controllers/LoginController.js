const { pool } = require("../db/db-connection");
const jwt = require("jsonwebtoken");
const { privateKey } = require("../auth/private_key.js");
const crypto = require("crypto");

async function hashPassword(password, salt) {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
}

module.exports.login = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const [rows] = await pool.execute(
      "SELECT * FROM t_User WHERE usenickName = ?",
      [req.body.nickName]
    );
    const user = rows[0];

    console.log("User found:", user);

    if (!user) {
      const message = "L'utilisateur demandé n'existe pas";
      return res.status(404).json({ message });
    }

    const salt = user.usesalt;
    const hashedPassword = await hashPassword(req.body.password, salt);

    console.log("Hashed password:", hashedPassword);
    console.log("User stored password:", user.usepassword);

    if (hashedPassword !== user.usepassword) {
      const message = "Le mot de passe est incorrecte.";
      return res.status(401).json({ message });
    } else {
      const token = jwt.sign(
        { userId: user.id, isAdmin: user.useisAdmin },
        privateKey,
        {
          expiresIn: "1y",
        }
      );
      const message = "L'utilisateur a été connecté avec succès";
      return res.json({ message, data: user, token });
    }
  } catch (error) {
    console.error("Error during login:", error);
    const message =
      "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants";
    return res.status(500).json({ message, data: error });
  }
};
