import mongoose from "mongoose"


//mongoose is a tool that helps nodejs commmunicate with mongodb
const noteSchema =new mongoose.Schema({
    title:String,
    description:String,
    
})

// a model is a tol created from a schema that allows you to work with collection
// mongoose converts the model name into a collection name
const noteModel =mongoose.model("note",noteSchema)

export default noteModel