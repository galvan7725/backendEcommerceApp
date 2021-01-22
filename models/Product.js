const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    richDescription:{
        type:String,
        default:'empty description'
    },
    image:{
        type: String,
        default:''
    },
    images:[{
        type: String,
    }],
    brand:{
        type:String,
        default:''
    },
    price:{
        type: Number,
        default:0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:1000
    },
    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);