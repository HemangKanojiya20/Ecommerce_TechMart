const express = require("express");
const productController = require("../Controllers/productController");
const productRoute = express.Router();


productRoute.get("/:id", productController.getSingleProduct);

productRoute.get("/", productController.getAllProducts);

productRoute.get("/search/getProductCount", productController.getProductCount)

module.exports = productRoute