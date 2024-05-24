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
    const decodedToken = jwt.verify(
      token,
      privateKey,
      (error, decodedToken) => {
        if (error) {
          const message =
            "L'utilisateur n'est pas autorisé à accéder à cette resource.";
          return res.status(401).json({ message, data: error });
        }
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          const message = "L'indentifiant de l'utilisateur est invalide";
          return res.status(401).json({ message });
        } else {
          next();
        }
      }
    );
  }
};
