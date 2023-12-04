const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");


const requireSignIn = (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user=decode;
        next()
    } catch (error) {
        console.log(error);
    }
}

const isAdmin = async(req, res, next) => {
    try {
        const user=await userModel.findById(req.user._id)

        if(user.role !==1){
            return res.status(401).send({
                success:false,
                message:"UnAuthorized Access",
                
            })
        }else{
            next()
        }

    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in Admin middleware",
            error
        })
    }
}

module.exports = {
    requireSignIn,isAdmin
}