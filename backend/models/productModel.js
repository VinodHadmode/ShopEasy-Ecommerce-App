const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.ObjectId, ref: "category", required: true },
    quantity: { type: Number, required: true },
    photo: { data: Buffer, contentType: String },
    shipping: { type: Boolean }
}, { timestamps: true })

const productModel = mongoose.model("products", productSchema)

module.exports = {
    productModel
}