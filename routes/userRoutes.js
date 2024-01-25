const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { login, register } = userController;

router.post("/register", register);
router.post("/login", login);

module.exports = router;
