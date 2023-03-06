const express = require("express")
const mongoose = require("mongoose")
const paiRoute = require("./routes/pai")
const userRoute = require("./routes/users")
const staffRoute = require("./routes/staff")
const bodyParser = require("body-parser")
require("dotenv").config()


const cors = require("cors")
const PORT = process.env.PORT || 5050

const app = express()
app.use(cors()) 
app.use(bodyParser.json())
app.use("/", paiRoute)
app.use("/", staffRoute)
app.use("/", userRoute)


mongoose.set("strictQuery", false)
mongoose.connect(process.env.DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error",
    console.error.bind(console, "errore di connessione")
)
db.once("open", ()=>{
    console.log("database connected")
})

app.listen(PORT, ()=> console.log(`server running correctly on PORT ${PORT}`))