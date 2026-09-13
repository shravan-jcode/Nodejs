
const express = require("express");
const { validationResult } = require("express-validator");
const {
    registerUserValidationRules
} = require("./middleware/validation.middleware");

const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello world"})
})

app.post(
    "/register",
    registerUserValidationRules(),
    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { username, email, password } = req.body;

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                username,
                email
            }
        });
    }
);

module.exports = app;



