

const mongoose = require("mongoose");

const campingSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  logo: { type: String, required: true },
  company: { type: String, required: true },
  description: {
    introduction: { type: String, default: "" },
    longitude: { type: Number, default: 0 },
    latitude: { type: Number, default: 0 }
  }
});

const Camping = mongoose.model("Camping", campingSchema);
module.exports = Camping;




// const mongoose = require("mongoose");

// const campingSchema = new mongoose.Schema({
//     image: { type: String, default: "" },
//     name: { type: String, required: true },
//     company: { type: String, required: true },
//     location: { type: String, required: true },
//     type: { type: String, required: true },
//     logo: { type: String, required: true },
//     // ✅ **Detail sahifasi uchun qo‘shimcha ma’lumotlar**
//     description: {
//         text1: { type: String, default: "" },
//         text2: { type: String, default: "" },
//         text3: { type: String, default: "" },
       
//     },
   
// });

// const Camping = mongoose.model("Camping", campingSchema);
// module.exports = Camping;



