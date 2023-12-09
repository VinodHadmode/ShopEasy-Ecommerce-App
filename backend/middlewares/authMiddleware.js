const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");


const requireSignIn = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error("JWT must be provided");
        }

        const token = authorizationHeader.split(" ")[1];

        if (!token) {
            throw new Error("Invalid JWT format");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ success: false, message: "Unauthorized Access" });
    }
};



const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)

        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",

            })
        } else {
            next()
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Admin middleware",
            error
        })
    }
}

module.exports = {
    requireSignIn, isAdmin
}