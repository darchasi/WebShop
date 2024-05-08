const db = require("../db/db-connection");

const validateUser = (user) => {
  const errors = [];
  const regex = /^[A-Za-z0-9\s]+$/;

  // Validación de firstName
  if (!user.firstName || user.firstName.trim().length === 0)
    errors.push("Le prénom de l'utilisateur ne peut pas être vide.");
  if (user.firstName.length > 35)
    errors.push(
      "Le prénom de l'utilisateur doit contenir au maximum 35 caractères."
    );
  if (!regex.test(user.firstName))
    errors.push(
      "Seules les lettres, les chiffres et les espaces sont autorisées."
    );
  if (!user.lastName || user.lastName.trim().length === 0)
    errors.push("Le nom de l'utilisateur ne peut pas être vide.");
  if (user.lastName.length > 35)
    errors.push(
      "Le nom de l'utilisateur doit contenir au maximum 35 caractères."
    );
  if (!regex.test(user.lastName))
    errors.push(
      "Seules les lettres, les chiffres et les espaces sont autorisées."
    );
  if (!user.nickName || user.nickName.trim().length === 0)
    errors.push("Le nom de l'utilisateur ne peut pas être vide.");
  if (user.nickName.length > 35)
    errors.push(
      "Le nom de l'utilisateur doit contenir au maximum 35 caractères."
    );
  if (!regex.test(user.nickName))
    errors.push(
      "Seules les lettres, les chiffres et les espaces sont autorisées."
    );

  return errors;
};

const addUser = async (user) => {
  const errors = validateUser(user);
  if (errors.length > 0) {
    throw new Error(errors.join(", ")); // Lanza un error si hay errores
  }

  const sql = `INSERT INTO User (firstName, lastName, nickName) VALUES (?, ?, ?)`;
  try {
    const [result] = await db.query(sql, [
      user.firstName,
      user.lastName,
      user.nickName,
    ]);
    return result;
  } catch (error) {
    throw new Error("Failed to insert user: " + error.message); // Lanza un error en caso de fallo en la inserción
  }
};

module.exports = {
  addUser,
};
