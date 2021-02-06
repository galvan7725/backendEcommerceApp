const express = require('express');
const router = express.Router();
const { listOrders, newOrder, singleOrder, updateOrder, deleteOrder, countSales, countOrders, ordersByUser } = require('../controllers/orderControlller');

router.get('/',listOrders);
router.post('/',newOrder);
router.get('/:orderId', singleOrder);
router.put('/:orderId',updateOrder);
router.delete('/:orderId',deleteOrder);
router.get('/get/totalsales',countSales);
router.get('/get/count', countOrders);
router.get('/get/userorders/:userId',ordersByUser);


module.exports = router;