const mongoose = require('mongoose');
// const Product = require('./product');
// const { cart } = require('../middleware/auth');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',

    },
    Products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }]
   

})

let cart = mongoose.model('cart', cartSchema)

module.exports = cart

