const mongoose =require("mongoose")
const tuningSchema = new mongoose.Schema({
    image: { type: String, default: "" } , // ✅ Rasm uchun yangi maydon
    name:{
        type: String,
        required:true,
        // unique:true,
    },
    company:{
        type:String,
        required:true,
        // unique:true,
    },
    cost:{
        type:Number,
        required:true,
        // unique:true,
    },
  
    license:{
        type:String,
        required:true,
        // unique:true,
    },

    location:{
        type:String,
        required:true,
        // unique:true,
    },
    people:{
        type:Number,
        required:true,
        // unique:true,
    },
    type:{
        type:String,
        required:true,
        // unique:true,
    },
    date:{
        type:Date,
        required:true,
        // unique:true,
    }

})
const Tuning= mongoose.model("Tuning", tuningSchema)
module.exports=Tuning;

