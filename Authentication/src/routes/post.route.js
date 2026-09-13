const express= require("express");
const router =express.Router()
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")

router.post("/create",async(req,res)=>{


    const token =req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try {
       const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user =await userModel.findOne({
            _id:decoded.id
        })
        console.log(user)
        
    } catch (error) {
        return res.status(401).json({
            message:"error"
        })
    }
    console.log(req.body)
    console.log(req.cookies)

    res.send("post created successfully")
})

module.exports =router
