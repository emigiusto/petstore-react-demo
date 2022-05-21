import React from "react";
import { ProductConsumer } from "../../context";
import Header from "../GeneralComponents/Header";
import Footer from "../GeneralComponents/Footer";

function orderCompleted() {
  return (
    <div>
      <Header />
      <ProductConsumer>
        <h1> Order is completed!</h1>
      </ProductConsumer>
      <Footer />
    </div>
  );
}

export default orderCompleted;
