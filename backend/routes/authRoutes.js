const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

router.post("/login", authController.login);
router.post("/sign-up", authController.register);
router.get("/get-user", verifyToken, authController.getUser);

module.exports = router;