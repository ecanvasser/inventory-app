const express = require("express");
const router = express.Router();

const carmodelController = require('../controllers/carmodelController');

// List of all car models
router.get('/', carmodelController.get_carmodels);

router.post('/new', carmodelController.add_carmodel);

module.exports = router;