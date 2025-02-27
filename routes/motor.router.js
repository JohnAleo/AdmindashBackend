const express = require("express");
const {
    AddNewMotor,
    GetAllMotorData,
    EditMotor,
    DeleteMotor,
    GetMotorById
} = require("../controllers/motor.controller");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ `multer` orqali fayl yuklash

const MotorRouter = express.Router();

// ✅ Yangi motor qo‘shish (asosiy rasm va 5 ta galereya rasmi bilan)
MotorRouter.post("/add", protect, upload.fields([
    { name: "image", maxCount: 1 },  // **Asosiy rasm**
    { name: "gallery", maxCount: 5 }  // **Galereya uchun 5 ta rasm**
]), AddNewMotor);

// ✅ Motorni yangilash (image va gallery yangilanadi)
MotorRouter.put("/:id", protect, upload.fields([
    { name: "image", maxCount: 1 },  
    { name: "gallery", maxCount: 5 },
]), EditMotor);

// ✅ Barcha motorlarni olish
MotorRouter.get("/", GetAllMotorData);

// ✅ ID orqali bitta motorni olish
// MotorRouter.get("/:id", GetMotorById);

MotorRouter.get("/:id", GetMotorById)


// ✅ Motorni o‘chirish
MotorRouter.delete("/:id", protect, DeleteMotor);

module.exports = MotorRouter;



