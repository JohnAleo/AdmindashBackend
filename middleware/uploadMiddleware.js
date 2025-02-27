const multer = require("multer");
const path = require("path");

// ✅ Fayllarni saqlash joyini belgilash
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// ✅ Fayl filtri
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("❌ Faqat JPEG, PNG yoki JPG fayllarni yuklash mumkin!"), false);
    }
};

// ✅ `multer` sozlamalarini yangilash
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Maksimal fayl o'lchami: 5MB
});

module.exports = upload;
