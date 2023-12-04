const express=require("express")
const { registerController, loginController, testController } = require("../controllers/authController")
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware")

const router=express.Router()

//routing

//1.REGISTER - POST
router.post("/register",registerController)

//2. LOGIN - POST
router.post("/login",loginController)

//3. Protected routes
router.get("/test",requireSignIn,isAdmin, testController)

//protected routes for user
router.get("/user-auth",requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})

//protected routes for admin
router.get("/admin-auth",requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})

module.exports={
    router
}