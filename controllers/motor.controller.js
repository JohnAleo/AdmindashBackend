
const Motor = require("../models/motor.model")
const multer = require('multer')
const path = require('path')
const mongoose = require("mongoose")

// ✅ Rasmlarni `uploads/` papkaga saqlash uchun konfiguratsiya
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


// ✅ Yangi motor qo‘shish (rasm bilan)

const AddNewMotor = async (req, res) => {
    try {
        console.log("📥 Kelayotgan ma'lumotlar (req.body):", req.body);
        console.log("📂 Kelayotgan fayllar (req.files):", req.files);
        console.log("🔍 Tekshirilyapti: req.body.description:", req.body.description);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "❌ Hech qanday ma’lumot kelmadi!" });
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            console.error("❌ Xatolik: Kelayotgan fayllar yo‘q!");
            return res.status(400).json({ message: "❌ Fayllar kelmadi!" });
        }

        console.log("✅ Kelayotgan fayllar ro‘yxati:", req.files);

        // ✅ **Text ma’lumotlarni JSON formatda to‘g‘ri olish**
        const { name, company, cost, people, location, type, date, license } = req.body;
        
        const description = req.body.description
            ? JSON.parse(req.body.description)  // ✅ Agar `description` JSON bo‘lsa, uni parse qilamiz
            : {
                text1: "Text 1 not provided",
                text2: "Text 2 not provided",
                text3: "Text 3 not provided",
                text4: "Text 4 not provided",
                text5: "Text 5 not provided",
            };

        console.log("✅ To‘g‘ri saqlanayotgan description:", description);

        // ✅ Asosiy rasmni olish
        const image = req.files["image"] 
            ? `http://localhost:7070/uploads/${req.files["image"][0].filename}`
            : null;

        // ✅ **Galereya rasmlarini `array` shaklida olish**
        const gallery = req.files["gallery"]
            ? req.files["gallery"].map(file => `http://localhost:7070/uploads/${file.filename}`)
            : [];

        console.log("✅ Backendga saqlanadigan ma'lumot:", { name, image, gallery, description });

        if (!name || !company || !cost || !location || !type || !date || !license) {
            return res.status(400).json({ message: "❌ Barcha maydonlarni to‘ldiring!" });
        }

        const newMotor = new Motor({
            name, company, cost, people, location, type, date, license, image,
            description,
            gallery
        });

        await newMotor.save();
        res.status(201).json({ message: "✅ Motor muvaffaqiyatli qo‘shildi!", newMotor });

    } catch (error) {
        console.error("❌ Motor qo‘shishda xatolik:", error);
        res.status(500).json({ message: "❌ Server xatosi, ma’lumot qo‘shilmadi!", error: error.message });
    }
};




// Qo'shilgan ma'lumotniyam yangi ro'yxat qilib ko'rsatish uchun quyidagi koddan foydalaniladi 
//va module.exports dan keyin AddNewMotor dan keyin vergul bilan yozib ikkalasini export qilamiz
const GetAllMotorData= async (req,res) => {
    try {
        const motors= await Motor.find();
        res.status(200).json(motors)
    } catch (error) {
        res.status(400).json({
            message:"Error fetching motor ", 
            error})
    }
}


const EditMotor = async (req, res) => {
    try {
        console.log("📥 Kelayotgan ID:", req.params.id);
        console.log("📥 Kelayotgan ma’lumot:", req.body);

        const { id } = req.params;
        const motor = await Motor.findById(id);

        if (!motor) {
            return res.status(404).json({ message: "Motor not found" });
        }

        // 🔄 Yangilanishi kerak bo'lgan maydonlar
        Object.keys(req.body).forEach(key => {
            if (key.startsWith("text")) {
                motor.description[key] = req.body[key] || motor.description[key];
            } else {
                motor[key] = req.body[key] || motor[key];
            }
        });

        // 🖼 Yangi rasm bo‘lsa, yangilanadi
        if (req.file) {
            motor.image = `http://localhost:7070/uploads/${req.file.filename}`;
        }

        // 📂 Yangi galereya rasmlari bo‘lsa, yangilanadi
        if (req.files["gallery"]) {
            motor.gallery = req.files["gallery"].map(file => `http://localhost:7070/uploads/${file.filename}`);
        }

        await motor.save();
        res.status(200).json({ message: "Motor updated successfully", motor });

    } catch (error) {
        console.error("❌ Motor yangilashda xatolik:", error);
        res.status(500).json({ message: "Error updating motor", error });
    }
};


const DeleteMotor = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("🗑️ O‘chirilayotgan motor ID:", id);

        // ✅ ID to‘g‘ri formatda ekanligini tekshirish
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(`❌ Noto‘g‘ri ID formati: ${id}`);
            return res.status(400).json({ message: "❌ Invalid ID format" });
        }

        // ✅ MongoDB dan ID orqali motorni topish
        const motor = await Motor.findById(id);
        if (!motor) {
            console.log(`❌ Motor topilmadi, ID: ${id}`);
            return res.status(404).json({ message: "❌ Motor not found!" });
        }

        // ✅ Haqiqiy o‘chirish amali
        await Motor.findByIdAndDelete(id);
        console.log(`✅ Deleted motor ID: ${id}`);

        return res.status(200).json({ message: "✅ Data deleted successfully", deletedMotor: motor });

    } catch (error) {
        console.error("❌ Xatolik `DeleteMotor` da:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "❌ Error deleting motor", error });
        }
    }
};

const GetMotorById = async (req, res) => {
    try {
        const motor = await Motor.findById(req.params.id);
        if (!motor) {
            return res.status(404).json({ message: "Motor topilmadi!" });
        }
        res.status(200).json(motor);
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error });
    }
};


module.exports=
{AddNewMotor,
GetAllMotorData,
EditMotor,
DeleteMotor,
GetMotorById,
upload
}


