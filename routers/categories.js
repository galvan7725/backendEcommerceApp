const express = require('express');
const router = express.Router();
const { newCategory, deleteCategory, categoryById } = require('../controllers/categoryController');

router.post('/',newCategory);
router.delete('/:categoryId',deleteCategory);


//params
router.param('categoryId',categoryById);

module.exports = router;