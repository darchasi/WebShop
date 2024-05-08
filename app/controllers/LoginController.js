import { randomUUID, randomBytes } from "crypto";
const { pool } = require("../db/db-connection");

const edit_token = randomUUID();

function generateRandomShortCode() {
  return randomBytes(4).toString("hex").slice(0, 12);
}

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize.mjs";
import { privateKey } from "../auth/private_key.mjs";

const loginRouter = express();
loginRouter.post("/", (req, res) => {
  User.findOne({ where: { nickName: req.body.nickName } })
    .then((user) => {
      if (!user) {
        const message = `L'utilisateur demandé n'existe pas`;
        return res.status(404).json({ message });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = `Le mot de passe est incorrecte.`;
            return res.status(401).json({ message });
          } else {
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "1y",
            });
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          }
        });
    })
    .catch((error) => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
      return res.json({ message, data: error });
    });
});
export { loginRouter };

module.exports.loginController = async (req, res) => {
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
