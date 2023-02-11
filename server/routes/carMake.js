const express = require('express');
const router = express.Router();

const carmake_controller = require('../controllers/carmakeController')

// List all car makes
router.get("/", carmake_controller.get_makes);

// Create new car make
router.post("/add", carmake_controller.add_make);

module.exports = router;