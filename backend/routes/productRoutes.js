const express = require("express")
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware")
const { createProductController, getProductController, getSingleProductController, productPhotoController, productDeleteController, updateProductController } = require("../controllers/productController")
const formidableMiddleware = require('express-formidable');

const productRouter = express.Router()

productRouter.post("/create-product", requireSignIn, isAdmin, formidableMiddleware(), createProductController)

//2. get product
productRouter.get("/get-product", getProductController)

//3. Single product
productRouter.get("/single-product/:id", getSingleProductController)

//4. product photo
productRouter.get("/product-photo/:pid",productPhotoController)

//5. delete product
productRouter.delete("/delete-product/:pid",productDeleteController)

//6. update product
productRouter.put("/update-product/:pid", requireSignIn, isAdmin, formidableMiddleware(), updateProductController)

module.exports = {
    productRouter
}