const { categoryModel } = require("../models/categoryModel");
const slugify = require("slugify")

//createCategoryController
const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).send({
                success: true,
                message: "Category Name is required!"
            })
        }

        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Present!"
            })
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(200).send({
            success: true,
            message: "New Category Created!",
            categoryName: category
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in creating Category",
            error
        })
    }
}

//updateCategoryController
const updateCategoryController = async (req, res) => {

    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "Category updated Successfully!!",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating Category",
            error
        })
    }
}

//categoryController
const categoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Categories List",
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting all categories",
            error
        })
    }
}

//singleCategoryController
const singleCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        //we can do it by using id instead of slug
        const category = await categoryModel.findOne({ _id: id })
        res.status(200).send({
            success: true,
            message: "Recieved Single Category",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting Single categories",
            error
        })
    }
}

//deleteCategoryController
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Deleted Category Successfully!!",

        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while deleting Single categories",
            error
        })
    }
}

module.exports = {
    createCategoryController,
    updateCategoryController,
    categoryController,
    singleCategoryController,
    deleteCategoryController,
    
}