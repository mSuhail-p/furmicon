const mongoose = require('mongoose');
let walletSchema = new mongoose.Schema({

balance:{
    type:Number,
    required:true
},  
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
}


})

module.exports=mongoose.model('wallet',walletSchema)