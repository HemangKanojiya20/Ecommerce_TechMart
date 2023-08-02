import React from "react";

import Home from '../pages/Home'
import Products from '../pages/Products'
import ProductDetails from '../pages/ProductDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import OrderHistory from '../pages/OrderHistory'
import { Navigate, Routes, Route } from 'react-router-dom'
import ThankYou from "../pages/ThankYou";
import Cart from "../components/Cart/Cart";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/orderHistory" element={<OrderHistory />} />
    </Routes>
  );
};

export default Routers;
