const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})

module.exports = mongoose.model('Product', productSchema);