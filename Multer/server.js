const express =require("express");
const multer =require("multer");

const app=express();

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads/")
    },
    filename(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload =multer({storage})

app.post("/upload", upload.single("image"),(req,res)=>{
    res.send("File Uploaded");
})

app.listen(3000,()=>{
    console.log("server running on port 3000")
})