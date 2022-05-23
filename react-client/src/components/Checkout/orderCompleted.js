import React from "react";
import { ProductConsumer } from "../../context";
import Header from "../GeneralComponents/Header";
import Footer from "../GeneralComponents/Footer";
import context from "react-bootstrap/esm/AccordionContext";
/* Landing page for order submitted */
export default function orderCompleted() {
  return (
    <div>
      <Header />
      <ProductConsumer>
        {(context) => {
          return(
      <div className="row justify-content-center p-4">
        <h3> Thanks for Shopping with Us!</h3>
        <h2> You will receive at
          { localStorage.hasOwnProperty('email') ? (' ' + localStorage.getItem('email') + ' ') : " your email " } 
          once we have processed your order</h2>
      </div>
          );
        }}
      </ProductConsumer>
      <Footer />
    </div>
    );
}
