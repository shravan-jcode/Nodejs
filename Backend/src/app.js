const express =require ("express")
const multer =require("multer")
const uploadFile =require('./serveices/storage.service')
const postModel = require("./models/post.model")
const cors = require("cors");

const app=express()
app.use(express.json())

app.use(cors());

const upload =multer({storage:multer.memoryStorage()})



app.post('/create-post',upload.single("image"),async(req,res)=>{
    console.log("req.body: ",req.body)
    console.log("req.file: ",req.file)

    const result =await uploadFile(req.file.buffer)

    console.log("result: ",result)

    const post =await postModel.create({
        image: result.url,
        caption:req.body.caption
    })

    res.status(201).json({
        message:"success",
        post
    })
})

app.get("/posts",async (req,res)=>{

    const posts =await postModel.find()

    return res.status(200).json({
        message:"Post fetche successfully",
        posts
    })
})
module.exports =app