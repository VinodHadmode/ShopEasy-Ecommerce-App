const express=require("express")
const { registerController, loginController, testController } = require("../controllers/authController")
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware")

const authRouter=express.Router()

//routing

//1.REGISTER - POST
authRouter.post("/register",registerController)

//2. LOGIN - POST
authRouter.post("/login",loginController)

//3. Protected routes
authRouter.get("/test",requireSignIn,isAdmin, testController)

//protected routes for user
authRouter.get("/user-auth",requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})

//protected routes for admin
authRouter.get("/admin-auth",requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})

module.exports={
    authRouter
}