import express from "express"
import noteModel from "./models/note.model.js"

const app = express()

app.use(express.json())


app.post("/notes", async (req, res) => {
    const data = req.body
    console.log(data)
    await noteModel.create({
        title: data.title,
        description: data.description
    })
    res.status(201).json({
        message: "created",
        data: data
    })
})

app.get("/notes", async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "notes fetched successfully",
        notes: notes
    })
})


app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete({
        _id: id
    })
    res.status(200).json({
        message: "deleted successfully"
    })
})

app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const desrciption = req.body.description

    await noteModel.findByIdAndUpdate({ _id: id }, { description: desrciption })

    res.status(200).json({
        message: "updated"
    })
})
export default app