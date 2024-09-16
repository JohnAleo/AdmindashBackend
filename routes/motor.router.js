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
router.get("/api/data",GetAllMotorData)
router.put("/api/data/:name", EditMotor)
router.delete("/api/data/:name",DeleteMotor)
module.exports = router
 
