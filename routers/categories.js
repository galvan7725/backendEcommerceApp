const express = require('express');
const router = express.Router();
const { newCategory } = require('../controllers/categoryController');

router.post('/',newCategory);



module.exports = router;