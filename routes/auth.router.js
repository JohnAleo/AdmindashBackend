const express= require("express");
const {registerUser, LoginIn}= require("../controllers/user.controller")

const router = express.Router(); 
router.post("/sign-up", registerUser);
router.post("/sign-in", LoginIn);
module.exports = router 