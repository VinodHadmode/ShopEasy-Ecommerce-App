const { default: slugify } = require("slugify");
const { productModel } = require("../models/productModel");
const fs = require("fs");
const { categoryModel } = require("../models/categoryModel");
const braintree = require("braintree");
const dotenv = require("dotenv");
const { orderModel } = require("../models/orderModel");

//payment gateway
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


const createProductController = async (req, res) => {
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
const productPhotoController = async (req, res) => {
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
const productDeleteController = async (req, res) => {
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
const updateProductController = async (req, res) => {
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
            message: "Error while updating product",
            error
        })
    }
}

//productFilterController
const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body

        const queries = {}
        if (checked.length > 0) {
            queries.category = checked
        }
        if (radio.length) {
            queries.price = { $gte: radio[0], $lte: radio[1] }
        }

        const filteredProducts = await productModel.find(queries)

        res.status(200).send({
            success: true,
            filteredProducts
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while Filtering product",
            error
        })
    }
}

//productCountController
const productCountController = async (req, res) => {
    try {
        const totalCount = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            totalCount
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while counting product",
            error
        })
    }
}

//productListController
const productListController = async (req, res) => {
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1

        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting product list",
            error
        })
    }
}

//searchProductController
const searchProductController = async (req, res) => {
    try {
        const { keywords } = req.params
        const result = await productModel.find({
            $or: [
                { name: { $regex: keywords, $options: "si" } },
                { description: { $regex: keywords, $options: "si" } }
            ]
        }).select("-photo")

        res.status(200).send({
            success: true,
            result
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while Searching product",
            error
        })
    }
}

//relatedProductController
const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const similarProducts = await productModel
            .find({ category: cid, _id: { $ne: pid } })
            .select("-photo")
            .limit(5)
            .populate("category")

        res.status(200).send({
            success: true,
            similarProducts
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while Searching product",
            error
        })
    }
}

//productCategoryController
const productCategoryController = async (req, res) => {
    try {
        const { slug } = req.params
        const category = await categoryModel.findOne({ slug })
        const products = await productModel.find({ category }).populate("category")

        res.status(200).send({
            success: true,
            category,
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting category wise product",
            error
        })
    }
}

//braintreeTokenController
const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, (err, response) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).send({
                    success: true,
                    response
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//braintreePaymentController
const braintreePaymentController = async(req,res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0
        cart?.map((c) => {
            return total = total + c.price
        })

        let transaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }, (err, result) => {
            if (result) {
                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id,
                }).save()

                res.status(200).send({
                    success: true
                })
            } else {
                res.status(400).send({
                    success: false,
                    err
                })
            }
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    productDeleteController,
    updateProductController,
    productFilterController,
    productCountController,
    productListController,
    searchProductController,
    relatedProductController,
    productCategoryController,
    braintreeTokenController,
    braintreePaymentController
}