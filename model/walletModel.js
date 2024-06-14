const mongoose = require('mongoose');
let walletSchema = new mongoose.Schema({

    balance: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    history: [
        {
            Date: {
                type: String,
                required: true
            },
            Description: {
                type: String,
                required: true
            },
            Amount: {
                type: String,
                required: true
            },
            time:{
                type:Date,
                required:true
            }
        }
    ]



})

module.exports = mongoose.model('wallet', walletSchema)