// const jwt =require("jsonwebtoken");
// const User = require("../models/auth.model")

// const protect = async(req, res, next) => {
//     let token;
//     if(req.headers.authorization && 
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         try {
//             token = req.headers.authorization.split(" ")[1];
//             const decoded = jwt.verify(token, 'shhhhh');
//             req.user = await User.findById(decoded.id)/* .select("password") */;
//             next();
//             if (!req.user){
//                 return res.status(401).json({message: "User not found"})
//             }
//             next();
//         } catch (error) {
//             res.status(401).json({message: "Not auth, token fail"})
//         }
//         if (!token) {
//             res.status(401).json({message: "No Auth, No TOKEN"})
//         }
//     }
// }
// module.exports={ protect }; 

const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("🔑 Tekshirilayotgan token:", token);

            // ✅ Tokenni to‘g‘ri verify qilish
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("✅ Token decode qilindi:", decoded);

            req.user = await User.findById(decoded.id);
            if (!req.user) {
                console.error("❌ User topilmadi!");
                return res.status(401).json({ message: "❌ Unauthorized: User not found!" });
            }

            next();
        } catch (error) {
            console.error("❌ Token xatosi:", error);
            return res.status(401).json({ message: "❌ Unauthorized: Invalid token!" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "❌ No Auth, No TOKEN" });
    }
};




module.exports = { protect };

