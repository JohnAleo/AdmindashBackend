const Caravan = require("../models/caravan.model")
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

const AddNewCaravan = async (req, res) => {
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

        const newCaravan = new Caravan({
            name, company, cost, people, location, type, date, license, image,
            description,
            gallery
        });

        await newCaravan.save();
        res.status(201).json({ message: "✅ Motor muvaffaqiyatli qo‘shildi!", newCaravan });

    } catch (error) {
        console.error("❌ Motor qo‘shishda xatolik:", error);
        res.status(500).json({ message: "❌ Server xatosi, ma’lumot qo‘shilmadi!", error: error.message });
    }
};




// Qo'shilgan ma'lumotniyam yangi ro'yxat qilib ko'rsatish uchun quyidagi koddan foydalaniladi 
//va module.exports dan keyin AddNewMotor dan keyin vergul bilan yozib ikkalasini export qilamiz
const GetAllCaravanData= async (req,res) => {
    try {
        const caravans= await Caravan.find();
        res.status(200).json(caravans)
    } catch (error) {
        res.status(400).json({
            message:"Error fetching caravan ", 
            error})
    }
}


const EditCaravan = async (req, res) => {
    try {
        console.log("📥 Kelayotgan ID:", req.params.id);
        console.log("📥 Kelayotgan ma’lumot:", req.body);

        const { id } = req.params;
        const caravan = await Caravan.findById(id);

        if (!caravan) {
            return res.status(404).json({ message: "Caravan not found" });
        }

        // 🔄 Yangilanishi kerak bo'lgan maydonlar
        Object.keys(req.body).forEach(key => {
            if (key.startsWith("text")) {
                caravan.description[key] = req.body[key] || caravan.description[key];
            } else {
                caravan[key] = req.body[key] || caravan[key];
            }
        });

        // 🖼 Yangi rasm bo‘lsa, yangilanadi
        if (req.file) {
            caravan.image = `http://localhost:7070/uploads/${req.file.filename}`;
        }

        // 📂 Yangi galereya rasmlari bo‘lsa, yangilanadi
        if (req.files["gallery"]) {
            caravan.gallery = req.files["gallery"].map(file => `http://localhost:7070/uploads/${file.filename}`);
        }

        await caravan.save();
        res.status(200).json({ message: "Motor updated successfully", caravan });

    } catch (error) {
        console.error("❌ Motor yangilashda xatolik:", error);
        res.status(500).json({ message: "Error updating motor", error });
    }
};


const DeleteCaravan = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("🗑️ O‘chirilayotgan motor ID:", id);

        // ✅ ID to‘g‘ri formatda ekanligini tekshirish
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(`❌ Noto‘g‘ri ID formati: ${id}`);
            return res.status(400).json({ message: "❌ Invalid ID format" });
        }

        // ✅ MongoDB dan ID orqali motorni topish
        const caravan = await Caravan.findById(id);
        if (!caravan) {
            console.log(`❌ Caravan topilmadi, ID: ${id}`);
            return res.status(404).json({ message: "❌ Motor not found!" });
        }

        // ✅ Haqiqiy o‘chirish amali
        await Caravan.findByIdAndDelete(id);
        console.log(`✅ Deleted motor ID: ${id}`);

        return res.status(200).json({ message: "✅ Data deleted successfully", deletedCaravan: caravan });

    } catch (error) {
        console.error("❌ Xatolik `DeleteMotor` da:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "❌ Error deleting motor", error });
        }
    }
};

const GetCaravanById = async (req, res) => {
    try {
        const caravan = await Caravan.findById(req.params.id);
        if (!caravan) {
            return res.status(404).json({ message: "Caravan topilmadi!" });
        }
        res.status(200).json(caravan);
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error });
    }
};


module.exports=
{AddNewCaravan,
GetAllCaravanData,
EditCaravan,
DeleteCaravan,
GetCaravanById,
upload
}






// const Caravan = require("../models/caravan.model")
// const multer = require('multer')
// const path = require('path')
// const mongoose = require("mongoose")

// // ✅ Rasmlarni `uploads/` papkaga saqlash uchun konfiguratsiya
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = path.join(__dirname, "../uploads");
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({ storage });


// // ✅ Yangi caravan qo‘shish (rasm bilan)

// const AddNewCaravan = async (req, res) => {
//     try {
//         console.log("📥 Kelayotgan so‘rov body:", req.body);
//         console.log("📂 Kelayotgan fayl:", req.file);

//         if (!req.user) {
//             console.log("❌ Ruxsat berilmagan foydalanuvchi!");
//             return res.status(403).json({ message: "❌ Unauthorized user!" });
//         }

//         const { name, company, cost, people, location, type, date, license } = req.body;
//         const image = req.file ? `http://localhost:7070/uploads/${req.file.filename}` : null;

//         if (!name || !company || !cost || !people || !location || !type || !date || !license) {
//             console.log("🚨 ❌ Maydonlarning biri yetishmayapti!");
//             return res.status(400).json({ message: "Barcha maydonlar to‘ldirilishi kerak!" });
//         }

//         const newCaravan = new Caravan({
//             name, company, cost, people, location, type, date, license, image
//         });

//         await newCaravan.save();
//         console.log("✅ Muvaffaqiyatli qo‘shildi:", newCaravan);
//         res.status(201).json({ message: "✅ Caravan muvaffaqiyatli qo‘shildi", newCaravan });

//     } catch (error) {
//         console.error("❌ Caravan qo‘shishda xatolik:", error);
//         res.status(500).json({ message: "❌ Caravan qo‘shishda server xatosi", error });
//     }
// };



// // Qo'shilgan ma'lumotniyam yangi ro'yxat qilib ko'rsatish uchun quyidagi koddan foydalaniladi 
// //va module.exports dan keyin AddNewCaravan dan keyin vergul bilan yozib ikkalasini export qilamiz
// const GetAllCaravanData= async (req,res) => {
//     try {
//         const caravans= await Caravan.find();
//         res.status(200).json(caravans)
//     } catch (error) {
//         res.status(400).json({
//             message:"Error fetching caravan ", 
//             error})
//     }
// }


// const EditCaravan = async (req, res) => {
//     try {
//         console.log("📥 Kelayotgan ID:", req.params.id);
//         console.log("📂 Kelayotgan fayl:", req.file);
//         console.log("📥 Kelayotgan ma'lumot:", req.body);

//         const { id } = req.params;
//         const caravan = await Caravan.findById(id);

//         if (!caravan) {
//             console.log("🚨 Caravan topilmadi!");
//             return res.status(404).json({ message: "Caravan not found" });
//         }

//         // 🔍 Eski rasmni saqlash
//         const oldImage = caravan.image;

//         // 🔄 Yangilanishi kerak bo'lgan maydonlarni tekshirish
//         Object.keys(req.body).forEach(key => {
//             caravan[key] = req.body[key] || caravan[key];
//         });

//         // 🖼 Agar yangi rasm yuklangan bo‘lsa, uni yangilaymiz
//         if (req.file) {
//             caravan.image = `http://localhost:7070/uploads/${req.file.filename}`;
//         } else {
//             caravan.image = oldImage; // ✅ Eski rasm saqlanib qoladi
//         }

//         await caravan.save();
//         console.log("✅ Caravan muvaffaqiyatli yangilandi:", caravan);
//         res.status(200).json({ message: "Caravan updated successfully", caravan });
//     } catch (error) {
//         console.error("❌ Caravan yangilashda xatolik:", error);
//         res.status(500).json({ message: "Error updating caravan", error });
//     }
// };

// const DeleteCaravan = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log("🔍 DELETE so‘rovi qabul qilindi, ID:", id);
        
//         const deletedCaravan = await Caravan.findByIdAndDelete(id);
        
//         if (!deletedCaravan) {
//             return res.status(404).json({ message: "Caravan topilmadi" });
//         }

//         res.status(200).json({ message: "Caravan muvaffaqiyatli o‘chirildi!" });
//     } catch (error) {
//         console.error("❌ Xatolik deleteCaravan funksiyasida:", error);
//         res.status(500).json({ message: "Serverda xatolik yuz berdi" });
//     }
// };




// module.exports=
// {AddNewCaravan,
// GetAllCaravanData,
// EditCaravan,
// DeleteCaravan,
// upload
// }
