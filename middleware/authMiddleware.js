const jwt =require("jsonwebtoken");
const User = require("../models/auth.model")

const protect= async(req, res, next) => {
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWidth("Bearer"))
        {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("password");
            next();
            if (!req.user){
                return res.status(401).json({message: "User not found"})
            }
            next();
        } catch (error) {
            res.status(401).json({message: "Not auth, token fail"})
        }
        if (!token) {
            res.status(401).json({message: "No Auth, No TOKEN"})
        }
    }
}
module.exports={ protect }; 