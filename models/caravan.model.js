
const mongoose = require("mongoose");

const caravanSchema = new mongoose.Schema({
    image: { type: String, default: "" },
    name: { type: String, required: true },
    company: { type: String, required: true },
    cost: { type: Number, required: true },
    license: { type: String, required: true },
    location: { type: String, required: true },
    people: { type: Number, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },

    // ✅ **Detail sahifasi uchun qo‘shimcha ma’lumotlar**
    description: {
        text1: { type: String, default: "" },
        text2: { type: String, default: "" },
        text3: { type: String, default: "" },
        text4: { type: String, default: "" },
        text5: { type: String, default: "" }
    },
    gallery: [
        { type: String, default: "" },  // image1
        { type: String, default: "" },  // image2
        { type: String, default: "" },  // image3
        { type: String, default: "" },  // image4
        { type: String, default: "" },  // image5
        { type: String, default: "" }   // image6
    ]
});

const Caravan = mongoose.model("Caravan", caravanSchema);
module.exports = Caravan;



