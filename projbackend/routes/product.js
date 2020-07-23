const express = require("express");
const router = express.Router();

//middlewares
const {getProductById,createProducts} = require("../controllers/product");
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId",getUserById);
router.param("productId",getProductById);

//routes
router.post("product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProducts);
module.exports= router;