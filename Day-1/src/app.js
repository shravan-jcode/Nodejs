import express from "express"
// import express from "express"; with es6

const app =express();//create express application object

app.use(express.json())

const notes =[]


app.post('/notes',(req,res)=>{
    
    //1.we can be able to access req.body because of the express express.json not the nodejs 
    //2.req.body is can be specific to the data that we are going to send here we are sending the 
    // json so thats why we have used express.json() 
    //3.it can be diffrent for the other form data or the file

    console.log(req.body); 
    notes.push(req.body)
    
    res.status(201).json({
        message:"Notes created succefully"
    })
   
})

app.get("/notes",(req,res)=>{

    res.status(201).json({
        message:"notes fecthed successfully",
        notes:notes
    })
})

app.delete("/notes/:i",(req,res)=>{
    const i=req.params.i 
    delete notes[i]
    
    res.status(200).json({
        message:"notes deleted successfully",
        notes:notes
    })

})

app.patch("/notes/:i",(req,res)=>{
    const i =req.params.i;

    const description =req.body.description
    
    notes[i].description =description

    res.status(200).json({
        message:"updated successfully",
        notes:notes
    })
})
// export default app with es6
export default app;