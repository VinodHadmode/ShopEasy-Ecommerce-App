const { default: slugify } = require("slugify");
const { productModel } = require("../models/productModel");
const fs = require("fs")


const createProductController = async (req,res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        // const { photo } = req.files
        const photo = req.files && req.files.photo;

        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is required!" });
            case !description:
                return res.status(400).send({ error: "Description is required!" });
            case !price:
                return res.status(400).send({ error: "Price is required!" });
            case !category:
                return res.status(400).send({ error: "Category is required!" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is required!" });
            case !photo || photo.size > 100000:
                return res.status(400).send({ error: "Photo is required!" });
            default:
                break;
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()
        res.status(200).send({
            success: true,
            message: "Product Created Successfully!!",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while Creating product",
            error
        })
    }
}


const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").populate("category").limit(10).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "All Products",
            totalCount: products.length,
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting product",
            error
        })
    }
}

//getSingleProductController
const getSingleProductController = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productModel.findOne({ _id: id }).select("-photo").populate("category")

        res.status(200).send({
            success: true,
            message: "Recieved Single Product",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting single product",
            error
        })
    }
}

//productPhotoController
const productPhotoController = async (req,res) => {
    try {
        const { pid } = req.params
        const products = await productModel.findById(pid).select("photo")
        if (products.photo.data) {
            res.set("Content-Type", products.photo.contentType)
            return res.status(200).send(products.photo.data)
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting single product",
            error
        })
    }
}


//productDeleteController
const productDeleteController = async (req,res) => {
    try {
        const { pid } = req.params
        const productTobeDeleted = await productModel.findByIdAndDelete(pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully!!",
            productTobeDeleted
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while deleting product",
            error
        })
    }
}

//updateProductController
const updateProductController = async (req,res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        const { pid } = req.params

        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is required!" })

            case !description:
                return res.status(400).send({ error: "Description is required!" })

            case !price:
                return res.status(400).send({ error: "Price is required!" })

            case !category:
                return res.status(400).send({ error: "Category is required!" })

            case !quantity:
                return res.status(400).send({ error: "Quantity is required!" })

            case photo && photo.size > 100000:
                return res.status(400).send({ error: "Photo is required!" })

            default:
                break;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(pid, { ...req.fields, slug: slugify(name) }, { new: true })

        if (photo) {
            updatedProduct.photo.data = fs.readFileSync(photo.path)
            updatedProduct.photo.contentType = photo.type
        }

        await updatedProduct.save()
        res.status(200).send({
            success: true,
            message: "Product updated Successfully!!",
            updatedProduct
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updatin product",
            error
        })
    }
}
module.exports = {
    createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    productDeleteController,
    updateProductController
}