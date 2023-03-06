const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StaffSchema = new Schema({
    name: {
        type: String,
        // required: true,
        min: 1
    },
    surname: {
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

module.exports = mongoose.model("staffModel", StaffSchema, "staff")
