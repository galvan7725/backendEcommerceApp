const express = require('express');
const router = express.Router();
const { newCategory, deleteCategory, categoryById, singleCategory, allCategories, updateCategory } = require('../controllers/categoryController');


router.get('/',allCategories);
router.post('/',newCategory);
router.delete('/:categoryId',deleteCategory);
router.get('/:categoryId', singleCategory);
router.put('/:categoryId', updateCategory);


//params
router.param('categoryId',categoryById);

module.exports = router;