const express = require("express")
const cartRoute = express.Router();
const {verifyToken} = require("../utils/verifyToken")
const cartController = require("../Controllers/CartController") 

cartRoute.post("/add", verifyToken, cartController.addToCart)
cartRoute.post("/decrease", verifyToken, cartController.decreaseQty)
cartRoute.delete("/remove", verifyToken, cartController.removeFromCart)
cartRoute.get("/",verifyToken, cartController.getCartData)
cartRoute.post("/mock-payment",verifyToken, cartController.buyProduct)
cartRoute.get("/orderHistory",verifyToken, cartController.getOrderHistory)

module.exports = cartRoute;