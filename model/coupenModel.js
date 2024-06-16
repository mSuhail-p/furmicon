const mongoose = require('mongoose')
const coupenSchema = new mongoose.Schema({

    coupenName: {
        type: String,
        required: true
    },
    coupenCode: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    activationDate: {
        type: Date,

    },
    expiryDate: {
        type: Date,
        required: true
    },
    cryteriaAmount: {
        type: Number,
        required: true
    },
    claimed: {
        type: Boolean,
        default: false

    }



})
coupenSchema.index({expiryDate:1},{expireAfterSeconds:0})

module.exports = mongoose.model('coupens', coupenSchema)