const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.listUsers = async(req, res)=>{
    try {
        const users = await User.find().select('-passwordHash');
        if(!users){
            res.status(400).send({error:'users not found'});
        }else{
            res.status(200).send({success:true,users});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'});
    }

}

exports.singleUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-passwordHash');
        if(!user) {
            res.status(404).send({error:'user not found'});
        }else{
            res.status(200).send({success: true,user: user});
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
            passwordHash : bcrypt.hashSync(req.body.password,10),
            phone : req.body.phone,
            isAdmin: req.body.isAdmin,
            apartment : req.body.apartment,
            street : req.body.street,
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
        console.log(error);
        res.status(500).send({error:'internal server error'});
    }
}

exports.login = async(req, res)=>{
    try {
        const secret = process.env.SECRET;
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).send({error: 'user not found'});
        }else{
            if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
                const token = jwt.sign({
                    userId: user.id,
                    isAdmin: user.isAdmin
                },secret,{expiresIn:'1w'});
                res.status(200).send({user: user.email,token});

            }else{
                res.status(400).send({error:'Invalid password'});
            }
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'})
    }
}

exports.countUsers = async(req, res)=>{
    try {
        const userCount = await User.countDocuments((err,count)=>count);
        if(!userCount){
            res.status(404).send({error:'count not found'});
        }else{
            res.status(200).send({success:true,count:userCount});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'})
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const response = await User.findByIdAndRemove(req.params.userId);
        if (response.error || !response){
            res.status(400).send({error:'error deleting user'});
        }else{
            res.status(200).send({success: true});
        }
    } catch (error) {
        res.status(500).send({error:'internal server error'})
    }
}