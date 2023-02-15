const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// Get all products in db
router.get("/", productController.get_products);

// Add new product to db
router.post("/new", productController.add_product);

module.exports = router;
