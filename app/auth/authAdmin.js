const jwt = require("jsonwebtoken");
const { privateKey } = require("./private_key.js");

module.exports.authAdmin = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, privateKey);
    const isAdmin = decodedToken.isAdmin;

    // Vérifie si l'utilisateur est admin
    if (!isAdmin) {
      const message = `L'accès est restreint aux administrateurs uniquement.`;
      return res.status(403).json({ message });
    }
    next();
  } catch (error) {
    const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
    return res.status(401).json({ message, data: error });
  }
};
