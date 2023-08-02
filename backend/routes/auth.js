const express = require("express");
const authController = require("../Controllers/authController")

const authRoute = express.Router();

authRoute.post("/register", authController.registerUser)
authRoute.post("/login", authController.login)

module.exports = authRoute