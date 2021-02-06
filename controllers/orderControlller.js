const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

exports.listOrders = async(req, res)=>{
    try {
        const orders = await Order.find().populate('user orderItems').sort({'dateOrdered': -1});
        if (!orders){
            return res.status(404).send({error: 'orders not found'});
        }else{
            res.status(200).send({success: true,orders});
        }
    } catch (error) {
         res.status(500).send({error:'internal server error'})
    }
}

exports.singleOrder = async(req, res)=>{
    try {
        const order = await Order.findById(req.params.orderId)
        .populate('user','_id name')
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'
        }})
        if(!order){
            res.status(404).send({error: 'order not found'});
        }else{
            res.status(200).send({success: true, order});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'})
    }
}

exports.newOrder = async(req, res)=>{
    try {
        const orderItemsIds = Promise.all( req.body.orderItems.map(async(orderItem)=>{
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            })

            newOrderItem = await newOrderItem.save();
            return newOrderItem._id;
        }))
        const orderItemsIdsResolved = await orderItemsIds;
        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async orderItemId=>{
            const orderItem = await OrderItem.findById(orderItemId).populate('product','price');
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice;
        }))

        const totalPrice = totalPrices.reduce((a,b)=> a + b, 0);

        let order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2 : req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: totalPrice,
            user: req.body.user
        })
        const response = await order.save();
        if (!response){
            res.status(500).send({error:'we cannot save the order'});
        }else{
            res.status(200).send({success: true,order});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error:'internal server error'});
    }
}

exports.updateOrder = async(req, res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId,{
            status: req.body.status
        },{new: true});
        if(!order){
            res.status(404).send({error: 'the order cannot be updated'});
        }else{
            res.status(200).send({success: true,order});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'})
    }
}

exports.deleteOrder = async (req, res)=>{
    try {
        const response = await Order.findByIdAndRemove(req.params.orderId);
        if (response.error || !response){
            res.status(500).send({error:'the order cannot be deleted'});
        }else{
            await response.orderItems.map(async(item)=>{
                 await OrderItem.findByIdAndRemove(item);
            })
            res.status(200).send({success: true, message: 'the order was successfully deleted'});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'});
    }
}

exports.countOrders = async (req, res) => {
    try {
        const counter = await Order.countDocuments((err,count)=>count);
        if (!counter){
            res.status(404).send({error: 'counter not found'});
        }else{
            res.status(200).send({success: true,counter});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'})
    }
}

exports.countSales= async(req, res) =>{
try {
    const totalSales =  await Order.aggregate([
        { $group: {_id : null, totalSales : { $sum : '$totalPrice'}} }
    ]);
    if(!totalSales){
        res.status(500).send({error:'sales not found'});
    }else{
        res.status(200).send({success: true,totalSales: totalSales.pop().totalSales});
    }
} catch (error) {
    res.status(500).send({error:'internal server error'})
}
}

exports.ordersByUser = async(req, res)=>{
    try {
        const orders = await Order.find({user: req.params.userId})
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'
        }}).sort({'dateOrdered': -1});
        if(!orders){
            return res.status(404).send({error: 'orders not found'});
        }else{
            res.status(200).send({success: true, orders});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'})
    }
}
