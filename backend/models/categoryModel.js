const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, lowercase: true }
})

const categoryModel=mongoose.model("category",categorySchema)

module.exports={
    categoryModel
}