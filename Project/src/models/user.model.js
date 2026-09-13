// user.model.js
const mongoose = require("mongoose");
const musicModel = require("./music.model");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'artist'],
        default: 'user'
    }
})
const userModel = mongoose.model("user", userSchema)

module.exports = userModel;