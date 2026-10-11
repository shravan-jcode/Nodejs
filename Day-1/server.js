import app from "./src/app.js"
import { hello } from "./demo.js"

app.listen(3000,()=>{
    console.log("Hello world")
})
hello()