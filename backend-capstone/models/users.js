const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
    },
    firstName: {
        type: String,
        // required: true,
        min: 1
    },
    lastName: {
        type: String,
        // required: true,
        min: 1
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        min: 1
    },
    password: {
        type: String,
        // required: true,
        min: 1
    },
    role: {
        type: String,
        default: "user",
    },
    service: {
        type: String,
        // required: true,
    },
   },{
    timestamps: true})

module.exports = mongoose.model("userModel", UserSchema, "users")
