import React from "react";
import { ToastContainer } from "react-toastify";
import Routers from "../../router/Routers";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
