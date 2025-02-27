// const express = require("express");
// const app = express();
// const cors = require("cors");
// const MotorRouter = require("./routes/motor.router");
// const CaravanRouter = require("./routes/caravan.router");
// const TuningRouter = require("./routes/tuning.router");
// const UsedCarRouter = require("./routes/usedcar.router");
// const authRouter = require("./routes/auth.router");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/admindashboard";
// app.use(cors()); 

// // ❌ BU KERAK EMAS (Multer ishlayotganda form-data uchun kerak emas edi!)
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // Statik fayllarni server orqali olish
// app.use("/uploads", express.static("uploads"));

// app.use("/auth", authRouter);
// app.use("/api/data/motor", MotorRouter);
// app.use("/api/data/caravan", CaravanRouter);
// app.use("/api/data/tuning", TuningRouter);
// app.use("/api/data/usedcar", UsedCarRouter);

// const PORT = process.env.PORT || 7070;
// mongoose.connect(mongoUri)
//     .then(() => {
//         console.log("✅ Connected to MongoDB");
//         app.listen(PORT, () => {
//             console.log("🚀 Server running on port:", PORT);
//         });
//     })
//     .catch((error) => {
//         console.error("❌ MongoDB Connection Error", error);
//     });




const express= require("express")
const app= express();
const cors= require("cors");
const MotorRouter = require("./routes/motor.router");
const CaravanRouter = require("./routes/caravan.router");
const TuningRouter = require("./routes/tuning.router");
const UsedCarRouter = require("./routes/usedcar.router");
const CampingRouter = require("./routes/camping.place.router")
const authRouter = require("./routes/auth.router")
const mongoose=require("mongoose")
const dotenv= require("dotenv");



dotenv.config();

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/admindashboard"
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ FormData ni o‘qish uchun


// Statik fayllarni server orqali olish
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRouter);
app.use("/api/data/motor", MotorRouter);
app.use("/api/data/caravan", CaravanRouter);
app.use("/api/data/tuning", TuningRouter);
app.use("/api/data/usedcar",UsedCarRouter);
app.use("/api/data/camping",CampingRouter);



const PORT = process.env.PORT || 7070;
mongoose.connect(mongoUri)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log("Server running on port:", PORT);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Error", error);
    });




