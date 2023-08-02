const Product = require("../models/Product");

const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById({ _id: id })

    res.status(200).json({
      success: true,
      message: "Successful",
      data: product,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Data not found" });
  }
};

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const products = await Product.find().skip(page * 8).limit(8)
    res.status(200).json({
      success: true,
      message: "Successful",
      data: products,
    });
    
  } catch (error) {
    res.status(404).json({ success: false, message: "Data not found" });
  }
};

const getProductCount = async(req, res) =>{

  try {
    const productCount = await Product.estimatedDocumentCount();

    res.status(200).json({success:true, data:productCount})
  } catch (error) {
    res.status(500).json({success:false, message:"Failed to fetch"})
  }
}

module.exports = {
  getSingleProduct,
  getAllProducts,
  getProductCount
};
