const {Category} = require('../models/Category');

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