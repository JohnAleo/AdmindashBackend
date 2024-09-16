const mongoose =require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
      
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please enter vaild Email address",
          ],
    },
     password:{
        type: String,
        minLength:6,
        required:true,

      
    }
   
});

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt)
})

UserSchema.methods.generateToken = function(){
    return jwt.sign(
        {id : this._id},
        process.env.SECRET_TOKEN,
        {expiresIn:"30d"}
    )
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password) 
}
const User= mongoose.model("User", UserSchema)
module.exports=User ;