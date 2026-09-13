const express =require("express");
const authController =require("../controller/auth.controller")

const router =express.Router();

router.post("/register",authController.registerUser)

router.get("/test",(req,res)=>{
    console.log("Cookies: ",req.cookies)
})

module.exports =router    