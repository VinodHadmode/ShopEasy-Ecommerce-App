const express = require("express")
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware")
const { createProductController,
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
} = require("../controllers/productController")
const formidableMiddleware = require('express-formidable');

const productRouter = express.Router()

productRouter.post("/create-product", requireSignIn, isAdmin, formidableMiddleware(), createProductController)

//2. get product
productRouter.get("/get-product", getProductController)

//3. Single product
productRouter.get("/single-product/:id", getSingleProductController)

//4. product photo
productRouter.get("/product-photo/:pid", productPhotoController)

//5. delete product
productRouter.delete("/delete-product/:pid", productDeleteController)

//6. update product
productRouter.put("/update-product/:pid", requireSignIn, isAdmin, formidableMiddleware(), updateProductController)

//7. fileter product
productRouter.post("/filter-product", productFilterController)

//8. product-count
productRouter.get("/count-product", productCountController)

//9. product per page
productRouter.get("/product-list/:page", productListController)

//10. Search Controller
productRouter.get("/search/:keywords", searchProductController)

//10. Similar products
productRouter.get("/related-products/:pid/:cid", relatedProductController)

//5. categorywise prodcut
productRouter.get("/product-category/:slug", productCategoryController)

//6. braintree token
productRouter.get("/braintree/token", braintreeTokenController)

//7. braintree payment
productRouter.post("/braintree/payment", requireSignIn, braintreePaymentController)

module.exports = {
    productRouter
}