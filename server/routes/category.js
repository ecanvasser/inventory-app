const express = require("express");
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.get_categories);

router.post('/new', categoryController.add_category);

router.post('/edit/:id', categoryController.edit_category);

module.exports = router;