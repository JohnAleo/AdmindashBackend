const express = require("express");
const {
    AddNewUsedCar,
    GetAllUsedCarData,
    EditUsedCar,
    DeleteUsedCar,
    GetUsedCarById
} = require("../controllers/used.car.controller");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ `multer` orqali fayl yuklash

const UsedCarRouter = express.Router();

// ✅ Yangi usedcar qo‘shish (asosiy rasm va 5 ta galereya rasmi bilan)
UsedCarRouter.post("/add", protect, upload.fields([
    { name: "image", maxCount: 1 },  // **Asosiy rasm**
    { name: "gallery", maxCount: 5 }  // **Galereya uchun 5 ta rasm**
]), AddNewUsedCar);

// ✅ UsedCarni yangilash (image va gallery yangilanadi)
UsedCarRouter.put("/:id", protect, upload.fields([
    { name: "image", maxCount: 1 },  
    { name: "gallery", maxCount: 5 },
]), EditUsedCar);

// ✅ Barcha usedcarlarni olish
UsedCarRouter.get("/", GetAllUsedCarData);

// ✅ ID orqali bitta usedcarni olish
// UsedCarRouter.get("/:id", GetUsedCarById);

UsedCarRouter.get("/:id", GetUsedCarById)


// ✅ UsedCarni o‘chirish
UsedCarRouter.delete("/:id", protect, DeleteUsedCar);

module.exports = UsedCarRouter;



