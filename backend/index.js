const express = require("express")
const dotenv = require("dotenv")
const { connection } = require("./config/db")
const { authRouter } = require("./routes/authRoutes")
const {categoryRouter}=require("./routes/categoryRoutes")
const { productRouter } = require("./routes/productRoutes")

const cors=require("cors")
 
//configuration
dotenv.config()

//express app
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/product",productRouter)


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

