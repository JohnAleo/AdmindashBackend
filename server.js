const express= require("express")
const app= express();
const cors= require("cors");
const router = require("./routes/motor.router");
const authRouter = require("./routes/auth.router")
const mongoose=require("mongoose")
const dotenv= require("dotenv")

dotenv.config();

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/admindashboard"
app.use(cors()); 
app.use(express.json());


app.use("/auth", authRouter)
app.use(router);



const PORT = process.env.PORT || 7070;
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => {
console.log("Connected MONGODB")
app.listen(PORT, ()=>{
    console.log("Server running on port:", PORT);
});
})
.catch((error) => {
    console.error("MonggoDB Connecting Error")
})
//Motor routerda ochganimiz uchun bu yerdan o'chiramiz yoki commentga olamiz
// app.post("/api/data", (req,res)=>{
// console.log(req.body);
// res.sendStatus(200).send("Data received")
// });




// Serverlarni update qilishda shu yo'ldan foydalaniladi
// app.use("/api/v1",userRoutes);
// app.use("/api/v2",userRoutes);


