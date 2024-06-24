const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'category'
        
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    images: {
        type: [String], // Array of strings for multiple images
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    offerPrice:{
        type:Number,
        required:false
    },
    offer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Offers'
    },
    is_blocked:{
        type:Number,
        default:0
    },
    salesCount:{
        type:Number,
        default:0
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
