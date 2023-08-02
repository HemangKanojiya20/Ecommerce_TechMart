const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product")

const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; 

  try {
    const product = await Product.findById({_id:productId});
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existingCart = await Cart.findOne({ user: userId });

    if (existingCart) {

      const existingCartItem = existingCart.items.find(item => item.product.toString() === productId);

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        existingCart.items.push({ product: productId });
      }
      await existingCart.save();

    } else {
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId }],
      });

      await newCart.save();
    }

    res.status(200).json({ message: 'Product added and updated to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

  const getCartData = async(req, res) => {
    
        const userId = req.user.id;
      
        try {
        
          const cart = await Cart.findOne({ user: userId }).populate("items.product");
          if (cart) {
            res.status(200).json({cart: cart.items });
          } else {
            res.status(200).json({ cart: [] }); 
          }
        } catch (error) {
          res.status(500).json({ error: 'An error occurred' });
        }
      }
   const decreaseQty = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id; 
  
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      const cartItem = cart.items.find((item) => item.product.toString() === productId);
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Product not found in the cart' });
      }
  
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }
  
      await cart.save();
  
      res.status(200).json({ message: 'Product quantity updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }   

  const removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id; 
  
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  
      await cart.save();
  
      res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  const buyProduct = async (req, res) => {
    const paymentDetails = req.body;
    
    const userId = req.user.id;
  
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      if (cart.items.length === 0) {
        return res.status(400).json({ error: 'No items in the cart' });
      }

      const order = new Order({
        user: userId,
        items: cart.items,
        total: paymentDetails.total,
        fullName:paymentDetails.fullName,
        phone:paymentDetails.phone,
        address:paymentDetails.address,
      });

      await order.save();
      cart.items = [];
      cart.total = 0;
      await cart.save();
  
      res.status(200).json({ message: 'Payment successful' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  const getOrderHistory = async(req, res) => {
    const userId = req.user.id;
    try {
      const orderHistory = await Order.findOne({ user: userId }).populate("items.product");

      if (orderHistory) {
        res.status(200).json({data: orderHistory });
      } else {
        res.status(200).json({ data: [] }); 
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  module.exports = {
    addToCart,
    getCartData,
    decreaseQty,
    removeFromCart,
    buyProduct,
    getOrderHistory
  }