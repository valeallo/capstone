const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./routes/users")
const paiRoute = require("./routes/pai")
const bodyParser = require("body-parser")
require("dotenv").config()


const cors = require("cors")
const PORT = process.env.PORT || 5050

const app = express()
app.use(cors()) 
app.use(express.json())
app.use("/", userRoute)
app.use("/", paiRoute)

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