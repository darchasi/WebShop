const express = require("express");

const router = express.Router();
const controller = require("../controllers/UserController");
const controllerLog = require("../controllers/LoginController");

router.get("/", controller.get);

//router.get("/:id", controller.getUserById);
router.get("/:nickname", controller.getUserByNickname);

router.post("/", controllerLog.login);

module.exports = router;
