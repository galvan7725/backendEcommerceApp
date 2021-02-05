const Order = require('../models/Order');

exports.listOrders = async(req, res)=>{
    try {
        const orders = await Order.find();
        if (!orders){
            return res.status(404).send({error: 'orders not found'});
        }else{
            res.status(200).send({success: true,orders});
        }
    } catch (error) {
         res.status(500).send({error:'internal server error'})
    }
}

exports.newOrder = async(req, res)=>{
    try {
        let order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2 : req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: req.body.totalPrice,
            user: req.body.user
        })
        const response = await order.save();
        if (!response){
            res.status(500).send({error:'we cannot save the order'});
        }else{
            res.status(200).send({success: true,order});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'});
    }
}
