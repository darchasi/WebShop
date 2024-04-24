const express = require("express");

const app = express();
const userRoute = require("./routes/User");
app.use("/users", userRoute);

// Démarrage du serveur
app.listen(8083, () => {
  console.log("Server running on port 8083");
});

//ajout du type: model dans le package.json
