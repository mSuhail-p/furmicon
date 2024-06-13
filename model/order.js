const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        required: true

    },
    userName: {
        type: String,
        required: true
    },
    shipAddress: [
        {
            name: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            streetName: {
                type: String,
                required: true
            },
            pinCode: {
                type: Number,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        }
    ],
    orderedProducts: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,

            },
            price: {
                type: Number,
                required: true,

            },
            totalPrice: {
                type: Number,
                required: true
            },
            status:{
                type:String,
                require:true,
                default:'pending'
            }

        }
    ],

    purchasedDate: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required:true
    },
    orderedTime:{
        type:Date,
        required:true
    }



})

let Orders = mongoose.model('Order', orderSchema)
module.exports = Orders