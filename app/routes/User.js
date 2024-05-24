const express = require("express");
const { auth } = require("../auth/auth");
const router = express.Router();
const controller = require("../controllers/UserController");
const controllerLog = require("../controllers/LoginController");

router.get("/", controller.getAll);

//router.get("/:id", controller.getUserById);
router.get("/:nickname", auth, controller.getUserByNickname);

router.post("/", controllerLog.login);

router.post("/", controllerLog.login);

module.exports = router;
