const express = require("express")
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware")
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController, productCategoryController } = require("../controllers/categoryController")

//category router
const categoryRouter = express.Router()

//category routes
//1. create category route
categoryRouter.post("/create-category", requireSignIn, isAdmin, createCategoryController)

//2. update category route
categoryRouter.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)

//3. All category
categoryRouter.get("/get-category", categoryController)

//4. Single category
categoryRouter.get("/single-category/:id",singleCategoryController)

//5. delete category
categoryRouter.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)

module.exports = {
    categoryRouter
}