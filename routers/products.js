const express = require('express');
const router = express.Router();
const {allProducts, newProduct, productById, singleProduct,updateProduct, deleteProduct} = require('../controllers/productController');


router.post(`/new`,newProduct);
router.get(`/all`,allProducts);
router.get('/:productId',singleProduct);
router.put('/:productId',updateProduct);
router.delete('/:productId',deleteProduct);


//params
router.param('productId',productById);

module.exports = router;