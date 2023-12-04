const { hashPassword, comparePassword } = require("../helpers/authHelpers")
const { userModel } = require("../models/userModel")
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body


        //checking existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already resistered,Please login!!"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, email, password: hashedPassword, phone, address })
        user.save()

        res.status(200).send({
            success: true,
            message: "User registered successfully!!",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong while Registration!!",
            error
        })
    }

}

//loginController

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        //validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not registered!"
            })
        }

        const matchPassword = await comparePassword(password, user.password)
        if (!matchPassword) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password!"
            })
        }

        //token generation
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        res.status(200).send({
            success: true,
            message: "Login Successfully!!",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role
            },
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}

//protected routes
const testController = (req, res) => {
    res.send("Accessed by only admin Protected routes")
}

module.exports = {
    registerController, loginController, testController
}