const express = require("express");
const {
    AddNewTuning,
    GetAllTuningData,
    EditTuning,
    DeleteTuning,
    GetTuningById
} = require("../controllers/tuning.controller");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ `multer` orqali fayl yuklash

const TuningRouter = express.Router();

// ✅ Yangi tuning qo‘shish (asosiy rasm va 5 ta galereya rasmi bilan)
TuningRouter.post("/add", protect, upload.fields([
    { name: "image", maxCount: 1 },  // **Asosiy rasm**
    { name: "gallery", maxCount: 5 }  // **Galereya uchun 5 ta rasm**
]), AddNewTuning);

// ✅ Tuningni yangilash (image va gallery yangilanadi)
TuningRouter.put("/:id", protect, upload.fields([
    { name: "image", maxCount: 1 },  
    { name: "gallery", maxCount: 5 },
]), EditTuning);

// ✅ Barcha tuninglarni olish
TuningRouter.get("/", GetAllTuningData);

// ✅ ID orqali bitta tuningni olish
// TuningRouter.get("/:id", GetTuningById);

TuningRouter.get("/:id", GetTuningById)


// ✅ Tuningni o‘chirish
TuningRouter.delete("/:id", protect, DeleteTuning);

module.exports = TuningRouter;



