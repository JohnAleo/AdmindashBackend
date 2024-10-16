const express=require("express");
const { 
    AddNewMotor,
    GetAllMotorData,
    EditMotor,
    DeleteMotor
     } = require("../controllers/motor.controller");
    const {protect} = require("../middleware/authMiddleware")
const router=express.Router();

router.post("/api/data", protect, AddNewMotor)
router.get("/api/data", protect,GetAllMotorData)
router.put("/api/data/:name", protect, EditMotor)
router.delete("/api/data/:name", protect, DeleteMotor)
module.exports = router
 
