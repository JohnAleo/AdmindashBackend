const express = require("express");
const CaravanRouter = express.Router();
const { 
    AddNewCaravan,
    GetAllCaravanData,
    EditCaravan,
    DeleteCaravan,
    GetCaravanById,
    upload
} = require("../controllers/caravan.controller");

const { protect } = require("../middleware/authMiddleware");

CaravanRouter.get("/", GetAllCaravanData); // ✅ Caravan ma’lumotlarini olish
CaravanRouter.post("/add", protect, upload.fields([
    { name: "image", maxCount: 1 },  // **Asosiy rasm**
    { name: "gallery", maxCount: 5 }  // **Galereya uchun 5 ta rasm**
]), AddNewCaravan); // ✅ Caravan ma’lumot qo‘shish
CaravanRouter.put("/:id", protect, upload.fields([
    { name: "image", maxCount: 1 },  
    { name: "gallery", maxCount: 5 },
]), EditCaravan); // ✅ Caravan ma’lumot yangilash

CaravanRouter.delete("/:id", protect, DeleteCaravan); // ✅ Caravan ma’lumot o‘chirish

// ✅ ID orqali bitta motorni olish
CaravanRouter.get("/:id", GetCaravanById)
module.exports = CaravanRouter;



