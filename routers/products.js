const express = require('express');
const router = express.Router();
const {allProducts, newProduct, productById, singleProduct,updateProduct} = require('../controllers/productController');


router.post(`/new`,newProduct);
router.get(`/all`,allProducts);
router.get('/:productId',singleProduct);
router.put('/:productId',updateProduct);


//params
router.param('productId',productById);

module.exports = router;