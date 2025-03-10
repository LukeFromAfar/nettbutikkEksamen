const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// const verifyToken = require("../middleware/verifyToken");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/get-user", authController.getUser);

module.exports = router;