
// const Camping = require("../models/camping.place.model")
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


// // ✅ Yangi camping qo‘shish (rasm bilan)

// const AddNewCamping = async (req, res) => {
//     try {
//         console.log("📥 Kelayotgan ma'lumotlar (req.body):", req.body);
//         console.log("📂 Kelayotgan fayllar (req.files):", req.files);
//         console.log("🔍 Tekshirilyapti: req.body.description:", req.body.description);

//         if (!req.body || Object.keys(req.body).length === 0) {
//             return res.status(400).json({ message: "❌ Hech qanday ma’lumot kelmadi!" });
//         }

//         if (!req.files || Object.keys(req.files).length === 0) {
//             console.error("❌ Xatolik: Kelayotgan fayllar yo‘q!");
//             return res.status(400).json({ message: "❌ Fayllar kelmadi!" });
//         }

//         console.log("✅ Kelayotgan fayllar ro‘yxati:", req.files);

//         // ✅ **Text ma’lumotlarni JSON formatda to‘g‘ri olish**
//         const { name, company,location, type, logo} = req.body;
        
//         const description = req.body.description
//             ? JSON.parse(req.body.description)  // ✅ Agar `description` JSON bo‘lsa, uni parse qilamiz
//             : {
//                 text1: "Text 1 not provided",
//                 text2: "Text 2 not provided",
//                 text3: "Text 3 not provided",
//             };

//         console.log("✅ To‘g‘ri saqlanayotgan description:", description);

//         // ✅ Asosiy rasmni olish
//         const image = req.files["image"] 
//             ? `http://localhost:7070/uploads/${req.files["image"][0].filename}`
//             : null;

//         // // ✅ **Galereya rasmlarini `array` shaklida olish**
//         // const gallery = req.files["gallery"]
//         //     ? req.files["gallery"].map(file => `http://localhost:7070/uploads/${file.filename}`)
//         //     : [];

//         console.log("✅ Backendga saqlanadigan ma'lumot:", { name, image, gallery, description });

//         if (!name || !company ||  !location || !type || !logo ) {
//             return res.status(400).json({ message: "❌ Barcha maydonlarni to‘ldiring!" });
//         }

//         const newCamping = new Camping({
//             name, company, location, type, logo,  image,
//             description,
            
//         });

//         await newCamping.save();
//         res.status(201).json({ message: "✅ Camping muvaffaqiyatli qo‘shildi!", newCamping });

//     } catch (error) {
//         console.error("❌ Camping qo‘shishda xatolik:", error);
//         res.status(500).json({ message: "❌ Server xatosi, ma’lumot qo‘shilmadi!", error: error.message });
//     }
// };




// // Qo'shilgan ma'lumotniyam yangi ro'yxat qilib ko'rsatish uchun quyidagi koddan foydalaniladi 
// //va module.exports dan keyin AddNewCamping dan keyin vergul bilan yozib ikkalasini export qilamiz
// const GetAllCampingData= async (req,res) => {
//     try {
//         const campings= await Camping.find();
//         res.status(200).json(campings)
//     } catch (error) {
//         res.status(400).json({
//             message:"Error fetching camping ", 
//             error})
//     }
// }


// const EditCamping = async (req, res) => {
//     try {
//         console.log("📥 Kelayotgan ID:", req.params.id);
//         console.log("📥 Kelayotgan ma’lumot:", req.body);

//         const { id } = req.params;
//         const camping = await Camping.findById(id);

//         if (!camping) {
//             return res.status(404).json({ message: "Camping not found" });
//         }

//         // 🔄 Yangilanishi kerak bo'lgan maydonlar
//         Object.keys(req.body).forEach(key => {
//             if (key.startsWith("text")) {
//                 camping.description[key] = req.body[key] || camping.description[key];
//             } else {
//                 camping[key] = req.body[key] || camping[key];
//             }
//         });

//         // 🖼 Yangi rasm bo‘lsa, yangilanadi
//         if (req.file) {
//             camping.image = `http://localhost:7070/uploads/${req.file.filename}`;
//         }

//         // 📂 Yangi galereya rasmlari bo‘lsa, yangilanadi
//         if (req.files["gallery"]) {
//             camping.gallery = req.files["gallery"].map(file => `http://localhost:7070/uploads/${file.filename}`);
//         }

//         await camping.save();
//         res.status(200).json({ message: "Camping updated successfully", camping });

//     } catch (error) {
//         console.error("❌ Camping yangilashda xatolik:", error);
//         res.status(500).json({ message: "Error updating camping", error });
//     }
// };


// const DeleteCamping = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log("🗑️ O‘chirilayotgan camping ID:", id);

//         // ✅ ID to‘g‘ri formatda ekanligini tekshirish
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             console.log(`❌ Noto‘g‘ri ID formati: ${id}`);
//             return res.status(400).json({ message: "❌ Invalid ID format" });
//         }

//         // ✅ MongoDB dan ID orqali campingni topish
//         const camping = await Camping.findById(id);
//         if (!camping) {
//             console.log(`❌ Camping topilmadi, ID: ${id}`);
//             return res.status(404).json({ message: "❌ Camping not found!" });
//         }

//         // ✅ Haqiqiy o‘chirish amali
//         await Camping.findByIdAndDelete(id);
//         console.log(`✅ Deleted camping ID: ${id}`);

//         return res.status(200).json({ message: "✅ Data deleted successfully", deletedCamping: camping });

//     } catch (error) {
//         console.error("❌ Xatolik `DeleteCamping` da:", error);
//         if (!res.headersSent) {
//             res.status(500).json({ message: "❌ Error deleting camping", error });
//         }
//     }
// };

// const GetCampingById = async (req, res) => {
//     try {
//         const camping = await Camping.findById(req.params.id);
//         if (!camping) {
//             return res.status(404).json({ message: "Camping topilmadi!" });
//         }
//         res.status(200).json(camping);
//     } catch (error) {
//         res.status(500).json({ message: "Server xatosi", error });
//     }
// };


// module.exports=
// {AddNewCamping,
// GetAllCampingData,
// EditCamping,
// DeleteCamping,
// GetCampingById,
// upload
// }


const Camping = require("../models/camping.place.model");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

// Rasmlarni "uploads" papkaga saqlash uchun konfiguratsiya
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Yangi camping qo‘shish
const AddNewCamping = async (req, res) => {
  try {
    console.log("📥 Kelayotgan ma'lumotlar (req.body):", req.body);
    console.log("📂 Kelayotgan fayllar (req.files):", req.files);

    // Ma'lumotlarni tekshirish
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Hech qanday ma’lumot kelmadi!" });
    }
    if (!req.files || !req.files["image"]) {
      return res.status(400).json({ message: "Rasm fayli kiritilmadi!" });
    }

    // Majburiy maydonlarni olish
    const { name, location, type, logo, company } = req.body;

    // Description obyektini olish (agar yuborilgan bo'lsa)
    let description = { introduction: "", longitude: 0, latitude: 0 };
    if (req.body.description) {
      try {
        description = JSON.parse(req.body.description);
      } catch (err) {
        return res.status(400).json({ message: "Description formati noto‘g‘ri" });
      }
    }

    // Majburiy maydonlarni tekshirish
    if (!name || !location || !type || !logo || !company) {
      return res.status(400).json({ message: "Barcha majburiy maydonlarni to‘ldiring!" });
    }

    // Asosiy rasm URL'sini yaratish
    const image = `http://localhost:7070/uploads/${req.files["image"][0].filename}`;

    console.log("✅ Saqlanadigan ma'lumot:", { name, location, type, logo, company, image, description });

    const newCamping = new Camping({
      name,
      location,
      type,
      logo,
      company,
      image,
      description,
    });

    await newCamping.save();
    res.status(201).json({ message: "Camping muvaffaqiyatli qo‘shildi!", newCamping });
  } catch (error) {
    console.error("Camping qo‘shishda xatolik:", error);
    res.status(500).json({ message: "Server xatosi, ma’lumot qo‘shilmadi!", error: error.message });
  }
};

// Barcha campinglarni olish
const GetAllCampingData = async (req, res) => {
  try {
    const campings = await Camping.find();
    res.status(200).json(campings);
  } catch (error) {
    res.status(400).json({ message: "Camping ma'lumotlarini olishda xatolik", error });
  }
};

// Campingni yangilash
const EditCamping = async (req, res) => {
  try {
    console.log("📥 Yangilanish uchun ID:", req.params.id);
    console.log("📥 Yangilanish uchun ma’lumotlar:", req.body);

    const { id } = req.params;
    const camping = await Camping.findById(id);
    if (!camping) {
      return res.status(404).json({ message: "Camping topilmadi" });
    }

    // Majburiy maydonlarni yangilash
    const { name, location, type, logo, company } = req.body;
    if (name) camping.name = name;
    if (location) camping.location = location;
    if (type) camping.type = type;
    if (logo) camping.logo = logo;
    if (company) camping.company = company;

    // Agar description yuborilgan bo'lsa, uni JSON formatida parse qilamiz
    if (req.body.description) {
      try {
        const desc = JSON.parse(req.body.description);
        camping.description = desc;
      } catch (err) {
        return res.status(400).json({ message: "Description formati noto‘g‘ri" });
      }
    }

    // Yangi rasm yuklangan bo‘lsa, uni yangilash
    if (req.files && req.files["image"] && req.files["image"].length > 0) {
      camping.image = `http://localhost:7070/uploads/${req.files["image"][0].filename}`;
    }

    await camping.save();
    res.status(200).json({ message: "Camping muvaffaqiyatli yangilandi", camping });
  } catch (error) {
    console.error("Camping yangilashda xatolik:", error);
    res.status(500).json({ message: "Camping yangilanishida xatolik", error: error.message });
  }
};

// Campingni o‘chirish
const DeleteCamping = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🗑️ O‘chirilayotgan camping ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Noto‘g‘ri ID formati" });
    }

    const camping = await Camping.findById(id);
    if (!camping) {
      return res.status(404).json({ message: "Camping topilmadi!" });
    }

    await Camping.findByIdAndDelete(id);
    res.status(200).json({ message: "Ma’lumot muvaffaqiyatli o‘chirildi", deletedCamping: camping });
  } catch (error) {
    console.error("O‘chirish jarayonida xatolik:", error);
    res.status(500).json({ message: "O‘chirishda xatolik", error: error.message });
  }
};

// ID bo‘yicha campingni olish
const GetCampingById = async (req, res) => {
  try {
    const camping = await Camping.findById(req.params.id);
    if (!camping) {
      return res.status(404).json({ message: "Camping topilmadi!" });
    }
    res.status(200).json(camping);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error });
  }
};

module.exports = {
  AddNewCamping,
  GetAllCampingData,
  EditCamping,
  DeleteCamping,
  GetCampingById,
  upload,
};
