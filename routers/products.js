const express = require('express');
const router = express.Router();
const {allProducts, newProduct, productById, singleProduct,updateProduct, deleteProduct, countProduct, featuredProducts} = require('../controllers/productController');


router.post(`/new`,newProduct);
router.get(`/`,allProducts);
router.get('/:productId',singleProduct);
router.put('/:productId',updateProduct);
router.delete('/:productId',deleteProduct);
router.get('/get/count',countProduct);
router.get('/get/featured/:count',featuredProducts);


//params
router.param('productId',productById);

module.exports = router;