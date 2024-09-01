
const User = require ("../models/auth.model");
const jwt= require("jsonwebtoken")
const generateToken = (id)=>{
  return jwt.sign({id}, "shhhhh",{
        expiresIn:"30d"
    } )
}


const registerUser = async (req,res) => {
    const {name, email, password} = req.body;

    try {
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"User already exists"})
        }
        const user= await User.create({
            name,
            email,
            password
        }); 
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({message : "Error register", error})
    }
};
const LoginIn = async( req, res) => {
    const{email, password} = req.body; 
    console.log("test1")
try { 
    const user = await User.findOne({email})
    console.log("test2")
    console.log(user)
    if (user && (await user.matchPassword(password)))
    {   
        console.log("test3")
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id),
            
        }); 
        
    }else{
            res.status(400).json({message : "Email or password is invalid !!!", error}) 
        }
} catch (error) {
res.status(400).json({message : "Error login", error})
}    
};

module.exports = {registerUser, LoginIn} 