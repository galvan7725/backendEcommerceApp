const {Category} = require('../models/Category');



exports.allCategories = async(req, res)=>{
    const categories = await Category.find();
    if(categories.error || !categories ){
        return res.status(404).send({error: 'categories not found'})
    }else{
        return res.status(200).send({status:'success',categories});
    }
}

exports.categoryById = (req, res, next, id) =>{
    console.log(id);
    Category.findById(id).select('_id name icon color')
    .exec((err,category) =>{
        if(err ||!category){
            return res.status(404).send({error: 'category not found'})
        }else{
            req.category = category;
            next();
        }
    })
}

exports.singleCategory =(req, res) =>{
   try {
    if(!req.category){
        res.status(404).send({error:'not found'})
    }else{
        res.status(200).send(req.category);
    }
   } catch (error) {
       res.status(500).send({error:'internal server error'});
   }
}

exports.newCategory = async(req, res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });

    const response = await category.save();
    if(response.error || !response){
        res.status(500).send({error:'error saving category'});
    }else{
        res.status(200).send(response);
    }

}

exports.updateCategory = async (req, res) => {
    try {
        const objectCategory = {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        }
        const response = await Category.findByIdAndUpdate(req.category._id,objectCategory,{new: true});
        if(response.error || !response){
            res.status(500).send({error:'error updating category'});
        }else{
            res.status(200).send({status: 'success',response});
        }
    } catch (error) {
        res.status(500).send({error: 'internal server error'});
    }
}

exports.deleteCategory = async(req, res)=>{
    try {
        const response = await Category.findByIdAndRemove(req.category._id);
            if(response.error || !response){
                res.status(500).send({error:'we have an error deleting category'});
            }else{
                res.status(200).send({status: 'success'});
            }
    } catch (error) {
        res.status(500).send({error:'internal server error'});
    }
}