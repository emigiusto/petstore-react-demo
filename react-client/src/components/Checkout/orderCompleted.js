import React from "react";
import { ProductConsumer } from "../../context";
import Header from "../GeneralComponents/Header";
import Footer from "../GeneralComponents/Footer";
import "./Checkout.module.css";

/* Landing page for order submitted */
export default function orderCompleted() {
  return (
    <div>
      <Header />
        
      <ProductConsumer>
        {(context) => {
          return(
            <div>     
          <div className="row justify-content-center p-4">
          <div className="w-50 p-3 row justify-content-center">
          <h1> Thanks for Shopping with Us!</h1>
          <h2> You will receive the details in
            {/* a call to context.user.email would look better*/}
          { true ? (' ' + "your email" + ' ') : " your email " } 
          once we have processed your order</h2>
            <img
                className="rounded mx-auto d-block"
                src='https://animatedkid.files.wordpress.com/2013/08/madagascar15.png'
                alt="" />
          </div>
          </div>
        </div>
          );
        }}
      </ProductConsumer>
      <Footer />
      </div>
    );
  }
  