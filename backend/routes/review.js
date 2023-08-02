const express = require("express")
const reviewRoute = express.Router();
const reviewController = require("../Controllers/reviewController")


reviewRoute.post("/:tourId",reviewController.createReview)

module.exports = reviewRoute;