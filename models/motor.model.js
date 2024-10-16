const mongoose =require("mongoose")
const motorSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true,
    },
    cost:{
        type:Number,
        // required:true,
        // unique:true,
    },
    company:{
        type:String,
        // required:true,
        // unique:true,
    },
    license:{
        type:String,
        // required:true,
        // unique:true,
    },

    location:{
        type:String,
        // required:true,
        // unique:true,
    },
    people:{
        type:Number,
        // required:true,
        // unique:true,
    },
    type:{
        type:String,
        // required:true,
        // unique:true,
    },
    date:{
        type:Date,
        // required:true,
        // unique:true,
    }
})
const Motor= mongoose.model("Motor", motorSchema)
module.exports=Motor;