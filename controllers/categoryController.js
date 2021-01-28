const {Category} = require('../models/Category');

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