import React from "react";

import "./App.css";
import Header from "./components/header/header";
import CarosalSection from "./components/carousal/carousal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Categ from "./components/categrioes/categiros";
import Products from "./components/products/products";
import ProductDetails from "./components/product-details/product-details";
import "bootstrap/dist/css/bootstrap.min.css";
import CartList from "./components/cart/cartlist";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ToastContainer />
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<CarosalSection />} />
            <Route path="/categories" element={<Categ />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/cart" element={<CartList />} />

            {/* <Route path="/products" element={<CarosalSection />} />
            <Route path="/products-item" element={<Categ />} />
            <Route path="/profile" element={<Categ />} />
            <Route path="/profile" element={<Categ />} /> */}
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
