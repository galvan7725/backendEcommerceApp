const express = require('express');
const router = express.Router();
const { listOrders, newOrder } = require('../controllers/orderControlller');

router.get('/',listOrders);
router.post('/',newOrder);


module.exports = router;