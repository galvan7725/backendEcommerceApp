const Product = require('../models/Product');

exports.allProducts = async(req,res)=>{
    const products = await Product.find();
    if(products.error || !products){
     res.status(400).send({error: products.error});
    }else{
        res.status(200).send(products);
    }
}

exports.newProduct = async(req, res) => {
    const product = new Product({
        name: req.body.name,
        image : req.body.image,
        countInStock: req.body.countInStock
    });
    console.log(req.body);
   const response = await product.save();
   if(response.error || !response){
       res.status(400).send({error:'we have an error while saving the product'});
   }else{
       res.status(200).send({success:'the product was successfully saved'});
   }
}