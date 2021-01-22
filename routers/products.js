const express = require('express');
const router = express.Router();
const {allProducts, newProduct} = require('../controllers/productController');


router.post(`/products`,newProduct);
router.get(`/all`,allProducts);

module.exports = router;