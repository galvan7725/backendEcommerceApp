const Product = require('../models/Product');
const {Category} = require('../models/Category');
const mongoose = require('mongoose');


exports.allProducts = async(req,res)=>{
    let filter = {};
    if(req.query.categories){
         filter = {category: req.query.categories.split(',')};
    }
    const products = await Product.find(filter).populate('category');
    if(products.error || !products){
     res.status(400).send({error: products.error});
    }else{
        res.status(200).send(products);
    }
}

exports.productById = async(req, res, next, id)=>{
  try {
    const product = await Product.findById(id,'_id name description richDescription image brand price category countInStock rating numReviews isFeatured').populate('category').exec();
    if(!product){
        return res.status(404).send({error: 'product not found'});
    }else{
        req.product = product;
        next();
    }   
  } catch (error) {
      res.status(500).send({error:'internal server error'});
  }
}

exports.singleProduct = (req, res)=>{
    res.status(200).send(req.product);
}

exports.newProduct = async(req, res) => {
    try {
        const file = req.file;
        if(!file){
            return res.status(400).send({error: 'No image in the request'});
        }
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image : `${basePath}${fileName}`,
            brand : req.body.brand,
            price : req.body.price,
            category : req.body.category,
            countInStock: req.body.countInStock,
            rating : req.body.rating,
            numReviews : req.body.numReviews,
            isFeatured : req.body.isFeatured
        });
        const isValid = await validateCategory(req.body.category);
        if(isValid){
            const response = await product.save();
                if(response.error || !response){
                    res.status(400).send({error:'we have an error while saving the product'});
                }else{
                    res.status(200).send({success:'the product was successfully saved',response});
                }
        }else{
            res.status(400).send({error:'the category id is invalid'});

        }
       
    } catch (error) {
        res.status(500).send({error:'internal server error'});
        console.log(error);
    }
}

exports.galleryImages = async(req, res)=>{
    try {
        if(!mongoose.isValidObjectId(req.params.productId)){
            return res.status(404).send({error:'product not found'});
        }
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        const files = req.files;
        let imagesPaths = [];
        if(files){
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.filename}`);
            })
        }
        const objectProduct = {
           images: imagesPaths
        }
        
            const response = await Product.findByIdAndUpdate(req.params.productId1,objectProduct,{new: true});
            if(response.error || !response){
                res.status(500).send({error:'error updating product'});
            }else{
                res.status(200).send({status: 'success',response});
            }
       

    } catch (error) {
        res.status(500).send({error:'internal server error'});
    }

}

exports.updateProduct = async (req, res) => {
    try {
        const objectProduct = {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image : req.body.image,
            brand : req.body.brand,
            price : req.body.price,
            category : req.body.category,
            countInStock: req.body.countInStock,
            rating : req.body.rating,
            numReviews : req.body.numReviews,
            isFeatured : req.body.isFeatured
        }
        const isValid = await validateCategory(req.body.category);
        if(isValid){
            const response = await Product.findByIdAndUpdate(req.product._id,objectProduct,{new: true});
            if(response.error || !response){
                res.status(500).send({error:'error updating product'});
            }else{
                res.status(200).send({status: 'success',response});
            }
        }else{
            res.status(404).send({error: 'category not found'});
        }
    } catch (error) {
        res.status(500).send({error: 'internal server error'});
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const response = await Product.findByIdAndRemove(req.product._id);
        if (response.error || !response){
            res.status(400).send({error:'error deleting product'});
        }else{
            res.status(200).send({success: true});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'})
    }
}

exports.countProduct = async(req, res)=>{
    try {
        const productCount = await Product.countDocuments((err,count)=>count);
        if(!productCount){
            res.status(404).send({error:'count not found'});
        }else{
            res.status(200).send({success:true,count:productCount});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'})
    }
}

exports.featuredProducts = async(req, res)=>{
    const count = req.params.count ? req.params.count : 0;
    try {
        const products = await Product.find({isFeatured: true}).limit(+count);
        if (!products){
            res.status(404).send({error: 'Products not found'});
        }else{
            res.status(200).send({success: true,products});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'});
    }
}

const validateCategory = async(categoryId)=>{
    console.log(categoryId);
    try {
        const category = await Category.findById(categoryId);
        console.log(category);
        if (!category){
            return false;
        }else{
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

