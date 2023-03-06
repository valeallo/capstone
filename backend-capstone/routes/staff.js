const express = require("express");
const router = express.Router();
const Staff = require("../models/staff");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")

router.post ("/addStaff", async (req, res) => {
    const newStaff = new Staff({
        name: req.body.firstName,
        surname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        profession: req.body.service,
    })
    try {
        const saveStaff = await newStaff.save()
        res.status(200).send({ message: "staff saved successfully", payload: saveStaff })
    } catch (err) {
        res.status(500).json({ message: "an error has occurred", error: err, payload: newStaff })
    }
})


        














module.exports = router;