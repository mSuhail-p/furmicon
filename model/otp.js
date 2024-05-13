const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        default:Date.now,
        expires:60
     } 
   
})

const OTP = mongoose.model('otp',userSchema)

 module.exports = OTP