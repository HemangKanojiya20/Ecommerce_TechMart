const Review = require("../models/Review");
const Product = require("../models/Product")

const createReview = async(req, res) => {

    try {
        const productId = req.params.productId
        const newReview = new Review(req.body)
        const savedReview = await newReview.save();
        const reviewAdded = await Product.findByIdAndUpdate(productId, {
            $push: { reviews: savedReview._id}
         })
         res.status(200).json({success:true, message:'Review Submitted', data: reviewAdded})
    } catch (error) {
        res.status(500).json({success:false,message:'Failed to submit'})
    }
}

module.exports = {
    createReview
}