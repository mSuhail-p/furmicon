const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    offer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Offers'

    },
    status:{
        type:Boolean,
        default:true
    },
    
})

const Category = mongoose.model('category',categorySchema)

module.exports=Category;