const express = require("express");
const { auth } = require("../auth/auth");
const { authAdmin } = require("../auth/authAdmin");
const router = express.Router();
const controller = require("../controllers/UserController");
const controllerLog = require("../controllers/LoginController");

router.get("/", authAdmin, controller.getAll);

router.get("/:nickname", auth, controller.getUserByNickname);
router.post("/", controllerLog.login);

router.post("/addUser", authAdmin, controller.addUser);

module.exports = router;
