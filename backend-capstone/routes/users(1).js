const express = require('express')
// const { check, validationResult } = require("express-validator");
const router = express.Router()
const bcrypt = require('bcrypt')
const Users = require('../Models/users')


router.get('/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({
            message: "an error is occurred"
        })
    }
})


router.post('/users',
    async (req, res) => {
        const error = validationResult(req)
        const salt = await bcrypt.genSalt(10) // creiamo la complessita del criptaggio
        const hashPassword = await bcrypt.hash(req.body.password, salt) // diciamo cosa criptare, e con quale complessità(salt)
        const newUser = new Users({
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
        })



        try {

            await newUser.save()
            res.status(200).send({
                message: 'User saved correctly',
                payload: {
                    userName,
                    email,
                    role
                }

            })



        } catch (error) {

            if (newUser.email == newUser.email && newUser.userName == newUser.userName) {
                res.status(500).send({
                    message: 'userName/E-mail already exists',
                    error: error
                })
            }
        }
    })


router.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await Users.findById(id).deleteOne()
        if (!user)
            return res
                .status(404)
                .send(`the User with id ${id} does not exist`)

        res.status(200).send('user deleted successfully')
    } catch (error) {
        res.status(500).send({
            message: "User can't be deleted",
            error: error
        })
    }
})

router.patch('/users/:id', async(req,res)=>{
    try {
        const { id } = req.params
        const updateUser = req.body
        const options = {new:true}
        const result = await Users.findByIdAndUpdate(id, updateUser, options)
        if(!result)
        return res
            .status(404)
            .send(`user with id ${id} not found`)
            
    res.status(200).send({
        message: "user info updated successfully",
        payload: result
    })
}
catch(error){
    res.status(500).send({
        message: "an error has occurred",
        error: error
    })
}
})






module.exports = router

