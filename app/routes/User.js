const express = require("express");
const { auth } = require("../auth/auth");
const router = express.Router();
const controller = require("../controllers/UserController");
const controllerLog = require("../controllers/LoginController");

<<<<<<< HEAD:routes/User.js
router.get("/", controller.getAll);
=======
router.get("/", controller.get);
>>>>>>> c5dad273eb1f76c1428e530aeda2963fc81c6b91:app/routes/User.js

//router.get("/:id", controller.getUserById);
router.get("/:nickname", auth, controller.getUserByNickname);

router.post("/", controllerLog.login);

router.post("/", controllerLog.login);

module.exports = router;
