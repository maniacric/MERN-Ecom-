const express = require("express");
const router = express.Router();

//middlewares
const {getProductById,createProducts,getProduct,deleteProduct,updateProduct,getAllProducts} = require("../controllers/product");
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getAllCategory } = require("../controllers/category");

router.param("userId",getUserById);
router.param("productId",getProductById);

//routes
router.post("product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProducts);
router.get("/product/:productId",getProduct);

//delete routes
router.delete("product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);


//update route
router.put("product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);

//listing route
router.get("products",getAllProducts)



module.exports= router;