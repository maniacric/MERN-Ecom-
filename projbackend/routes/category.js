const express = require("express");
const router = express.Router();
const category = require("../models/category");

const {getCategoryById, getAllCategory,updateCategory,createCategory,getCategory,deleteCategory} = require("../controllers/category");
const { isSignedIn,isAdmin,isAuthenticated }  = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId",getUserById);
router.param("categoryId", getCategoryById);

//actual Routes
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);

//read
router.get("/categories/:getCategoryById", getCategory);
router.get("/categories",getAllCategory);

//update
router.put("categoty/:categotyId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);

//delete
router.delete("categoty/:categotyId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory)
module.exports = router;