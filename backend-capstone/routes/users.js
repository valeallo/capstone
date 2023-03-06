const express = require("express")
const router = express.Router()
const Users = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")

router.get("/users", async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).send(users)
    } catch (err) {
        res.status(500).json({ message: "an error has occurred" })
    }
})

router.post("/users", async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new Users({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
        service: req.body.service,   
    })
    try {
        const saveUser = await newUser.save()
        res.status(200).send({ message: "user saved successfully", payload: saveUser })
    } catch (err) {
        res.status(500).json({ message: "an error has occurred", error: err })
    }
}
)


router.get("/user/:id", async (req, res) => {
  const {id} = req.params;
  try {
      const user = await Users.findById(id)
      res.status(200).send(user)
      if (!user) {
          res.status(404).send({message: "user not found"})
      }
  }
  catch (err) {
      res.status(500).json({message: "an error has occurred", error: err})
  }
})

router.get("/service/:service", async (req, res) => {
    const {service} = req.params;
    try {
      const users = await Users.find({service: service})
      res.status(200).send(users)
      if (!users) {
          res.status(404).send({message: "users not found"})
      }
  }
  catch (err) {
      res.status(500).json({message: "an error has occurred", error: err})
  }
})




router.delete("/users/:id", async (req, res) => {
    const { id } = req.params
    try {
        const user = await Users.findById(id).deleteOne()
        if (!user) { return res.status(404).send(`user with id ${id} not found`) }
        res.status(200).send(`user ${id} deleted successfully`)
    } catch (err) {
        res.status(500).json({ message: "an error has occurred", error: err })
    }
})



router.patch("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateUser = req.body;
      const options = { new: true };
  
      const result = await Users.findByIdAndUpdate(id, updateUser, options);
      if (!result) {return res.status(404).send(`user with id ${id} not found`);}
  
      res.status(200).send({
        message: "user info updated successfully",
        payload: result,
      });
    } catch (error) {
      res.status(500).send({
        message: "an error has occurred",
        error: error,
      });}
  });





router.post('/register', [ 
    check('username', 'username is required')
        .trim()
        .exists()
        .isLength({ min: 3 })
        .withMessage('username must be at least 3 chars long'),
    check('email', 'email is required')
        .trim()
        .exists()
        .isEmail()
        .withMessage('invalid email address')
        .normalizeEmail(),
    check('password', 'password is required')
        .trim()
        .exists()
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 chars long')

],
 async (req, res) => {
    
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(422).json({ error: error.array() })
    }
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password, salt)
    const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role
    })
    try {
        const saveUser = await newUser.save()
        res.status(200).send({ message: "user saved successfully", payload: saveUser })
    } catch (err) {
        if (newUser.email == newUser.email && newUser.username == newUser.username) {
            res.status(500).send({
                message: 'username/E-mail already exists',
                error: error
            })
        }
    }

})



router.post("/login", async (req, res) => {
    const user = await Users.findOne({ email: req.body.email })
    
    if (!user) {
      return res.status(404).send({
        message: "Email not found",
      });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(404).send({
        message: "Wrong Password",
      });
    }
    const token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '24h' })
    res.header('authorization', token).status(200).send({
      email: user.email,
      token: token,
      role: user.role,
      user_id: user._id
    })
    



  
    
  });


  router.post("/login", async (req, res) => {

    const user = await Users.findOne({ email: req.body.email })
    
    if (!user) {
      return res.status(404).send("Email not found"
      );
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(404).send( "Wrong Password"
      );
    }
    const token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '24h' })
    res.header('authorization', token).status(200).send({
      email: user.email,
      token: token,
      role: user.role,
      user_id: user._id
    })
    
  });


  router.post("/users/login", async (req, res) => {
    try{
    const user = await Users.findOne({ email: req.body.email })
    
    if (!user) {
      return res.status(404).send("Email not found"
      );
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(404).send( "Wrong Password"
      );
    }
    const token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '24h' })
    res.header('authorization', token).status(200).send({
      email: user.email,
      token: token,
      role: user.role,
      user_id: user._id
    })} catch (err) {
        res.status(500).json({ message: "an error has occurred", error: err })
    }
    



  
    
  });


  router.get('users/:role', async (req, res) => {
    const { role } = req.params
    try {
        const usersByRole = await Users.find({role: role})
        if (!usersByRole) { return res.status(404).send(`user with role ${role} not found`) }
        res.status(200).send(usersByRole)
    
    
    }
    catch (err) {
        res.status(500).json({ message: "an error has occurred", error: err })
    }

    })

    router.get('/users/:id', async (req, res) => {
        const { id } = req.params
        try {  
          const user = await Users.findById(id)
          if (!user) { return res.status(404).send(`user with id ${id} not found`) }
          res.status(200).send(user)
        } catch (err) {
          res.status(500).json({ message: "an error has occurred", error: err })
        }
          
        })


        
module.exports = router