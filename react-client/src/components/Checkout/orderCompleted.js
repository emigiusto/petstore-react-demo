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
            
      <div className="row justify-content-center p-4">

        <h3> Thanks for Shopping with Us!</h3>
        <h2> You will receive an email at
          { localStorage.hasOwnProperty('email') ? (' ' + localStorage.getItem('email') + ' ') : " your email " } 
          once we have processed your order</h2>
          <div className="w-50 p-3 row justify-content-center">
            <img
                className="rounded mx-auto d-block"
                src='https://animatedkid.files.wordpress.com/2013/08/madagascar15.png'
                alt="" />
          </div>
          </div>
          );
        }}
      </ProductConsumer>
      <Footer />
    </div>
    );
  }
  