const validateUser = (user) => {
  const errors = [];
  const regex = /^[A-Za-z0-9\s]+$/;

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
  if (!user.password || user.password.trim().length === 0)
    errors.push("Le mot de passe ne peut pas être vide.");
  if (user.password.length < 4)
    errors.push("Le mot de passe doit contenir au moins 4 caractères.");
  if (typeof user.isAdmin !== "boolean")
    errors.push("Le rôle d'administrateur doit être un booléen.");

  return errors;
};

module.exports = { validateUser };
