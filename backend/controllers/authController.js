const { hashPassword, comparePassword } = require("../helpers/authHelpers")
const { orderModel } = require("../models/orderModel")
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
                role: user.role
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

//updateProfileController
const updateProfileController = async (req, res) => {
    try {
        const { name, phone, address } = req.body
        const user = await userModel.findById(req.user._id)

        const updatedUser = await userModel
            .findByIdAndUpdate(req.user._id, {
                name: name || user.name,
                phone: phone || user.phone,
                address: address || user.address,
            },
                { new: true }
            )
        res.status(200).send({
            success: true,
            message: "Profile updated successfully!!",
            updatedUser
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating user profile",
            error
        })
    }
}

//getOrdersController
const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name")

        res.status(200).send({
            success: true,
            message: "Recieved orders successfully!!",
            orders
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting orders",
            error
        })
    }
}

//getAllOrdersController
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            message: "Recieved All orders successfully!!",
            orders
        })


    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting orders",
            error
        })

    }
}

//orderStatusController
const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body

        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.status(200).send({
            success: true,
            message: "Updated order status successfully!!",
            orders
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating orders",
            error
        })
    }
}

module.exports = {
    registerController,
    loginController,
    testController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController
}