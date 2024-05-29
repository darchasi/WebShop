const jwt = require("jsonwebtoken");
const { privateKey } = require("./private_key.js");

module.exports.auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message =
      "Vous n'avez par fourni de jeton d'authentification. Ajoutez-en un dans l'en tête de la requête.";
    return res.status(401).json({ message });
  } else {
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, privateKey, (error, decodedToken) => {
      if (error) {
        const message =
          "L'utilisateur n'est pas autorisé à accéder à cette resource.";
        return res.status(401).json({ message, data: error });
      }

      const { userId, isAdmin } = decodedToken;
      req.userId = userId;
      req.isAdmin = isAdmin;

      if (req.params.userId && req.params.userId !== userId && !isAdmin) {
        const message =
          "L'utilisateur n'est pas autorisé à accéder à ce profil.";
        return res.status(403).json({ message });
      } else {
        next();
      }
    });
  }
};
