import React from "react";
//React Router Dom
import { Routes, Route, BrowserRouter } from "react-router-dom";

//React-bootstrap import
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound";
import Home from "./components/Home/Home";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import ProductDetailsPage from "./components/ProductDetailspage/ProductDetailsPage";
import Login from "./components/Login/Login";
import Checkout from "./components/Checkout/Checkout";
import OrderCompleted from "../src/components/Checkout/orderCompleted";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product-list" element={<ProductsPage />} />
          <Route path="/product-list/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordercompleted" element={<OrderCompleted />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
export default App;
