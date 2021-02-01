const User = require('../models/User');

exports.listUsers = async(req, res)=>{
    try {
        const users = await User.find();
        if(!users){
            res.status(400).send({error:'users not found'});
        }else{
            res.status(200).send({success:true,users});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'});
    }

}

exports.newUser = async(req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash : req.body.passwordHash,
            phone : req.body.phone,
            isAdmin: req.body.isAdmin,
            apartment : req.body.apartment,
            zip : req.body.zip,
            city : req.body.city,
            country : req.body.country
        })
        const response = await user.save();
        if(!response){
            res.status(500).send({error:'error saving user'});
        }else{
            res.status(200).send({success: true,user});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'});
    }
}