const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

router.post("/add", verifyToken, verifyAdmin, productController.addProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", verifyToken, verifyAdmin, productController.deleteProduct);

module.exports = router;