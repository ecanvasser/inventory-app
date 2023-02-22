const express = require("express");
const router = express.Router();

const carmodelController = require("../controllers/carmodelController");

// List of all car models
router.get("/", carmodelController.get_carmodels);

// Add new car model
router.post("/new", carmodelController.add_carmodel);

// Edit existing car model
router.post("/edit/:id", carmodelController.edit_carmodel);

// Delete existing car model
router.post("/delete/:id", carmodelController.delete_carmodel);

module.exports = router;
