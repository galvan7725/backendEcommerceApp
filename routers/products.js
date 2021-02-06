const express = require('express');
const router = express.Router();
const {allProducts, productById, singleProduct,updateProduct, deleteProduct, countProduct, featuredProducts, newProduct, galleryImages} = require('../controllers/productController');
const { uploadOptions } = require('../util/util');



router.post(`/new`,uploadOptions.single('image'),newProduct);
router.put('/gallery-images/:productId1',uploadOptions.array('images',10),galleryImages);
router.get(`/`,allProducts);
router.get('/:productId',singleProduct);
router.put('/:productId',updateProduct);
router.delete('/:productId',deleteProduct);
router.get('/get/count',countProduct);
router.get('/get/featured/:count',featuredProducts);


//params
router.param('productId',productById);


module.exports = router;