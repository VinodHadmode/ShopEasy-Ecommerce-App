const express = require("express")
const dotenv = require("dotenv")
const { connection } = require("./config/db")

//configuration
dotenv.config()

//express app
const app = express()

//middlewares
app.use(express.json())

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