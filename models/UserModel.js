// userModel.js
const db = require("../db/mock-users");

const validateUser = (user) => {
  const errors = [];
  const regex = /^[A-Za-z0-9\s]+$/;

  // Validación de firstName
  if (!user.firstName || user.firstName.trim().length === 0)
    errors.push("Le prénom de l'utilisateur ne peut pas être vide.");
  if (user.firstName.length > 35)
    errors.push(
      "Le nom de l'utilisateur doit contenir au maximum 35 caractères."
    );
  if (!regex.test(user.firstName))
    errors.push(
      "Seules les lettres, les chiffres et les espaces sont autorisées."
    );

  return errors;
};

const addUser = async (user) => {
  const errors = validateUser(user);
  if (errors.length > 0) {
    return { errors };
  }

  const sql = `INSERT INTO User (firstName, lastName, nickName) VALUES (?, ?, ?)`;
  const result = await db.query(sql, [
    user.firstName,
    user.lastName,
    user.nickName,
  ]);
  return result;
};

module.exports = {
  addUser,
};
