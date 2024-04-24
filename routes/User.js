const express = require("express");

const router = express.Router();
const controller = require("../controllers/UserController");
router.get("/", controller.get);

//router.get("/:id", controller.getUserById);
router.get("/:nickname", controller.getUserByNickname);

module.exports = router;
