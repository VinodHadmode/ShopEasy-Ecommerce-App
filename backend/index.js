const express = require("express")
const dotenv = require("dotenv")
const { connection } = require("./config/db")
const { router } = require("./routes/authRoutes")
const cors=require("cors")

//configuration
dotenv.config()

//express app
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth",router)


const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
    try {
        await connection
        console.log("Connected to DB !!");
    } catch (error) {
        console.log(error);
        console.log(`Something went wrong while connecting to DB`);
    }
    console.log(`Server is running on ${PORT}`);

})

