const express = require("express");
const {
    AddNewCamping,
    GetAllCampingData,
    EditCamping,
    DeleteCamping,
    GetCampingById
} = require("../controllers/cam.place.controller");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ `multer` orqali fayl yuklash

const CampingRouter = express.Router();

// ✅ Yangi camping qo‘shish (asosiy rasm va 5 ta galereya rasmi bilan)
CampingRouter.post("/add", protect, upload.fields([
    { name: "image", maxCount: 1 },  // **Asosiy rasm**
]), AddNewCamping);

// ✅ Campingni yangilash (image va gallery yangilanadi)
CampingRouter.put("/:id", protect, upload.fields([
    { name: "image", maxCount: 1 },  
]), EditCamping);

// ✅ Barcha campinglarni olish
CampingRouter.get("/", GetAllCampingData);

// ✅ ID orqali bitta campingni olish
// CampingRouter.get("/:id", GetCampingById);

CampingRouter.get("/:id", GetCampingById)


// ✅ Campingni o‘chirish
CampingRouter.delete("/:id", protect, DeleteCamping);

module.exports = CampingRouter;



