import React from "react";
import Header from "../GeneralComponents/Header";
import Footer from "../GeneralComponents/Footer";
import "./Checkout.css";

/* Landing page for order submitted */
export default function orderCompleted() {
  return (
    <div>
      <Header />

      <div>
        <div className="row justify-content-center p-4">
          <div
            className="w-50 p-3 row justify-content-center"
            id="checkoutcompleted_title"
          >
            <h1 className="p-4"> Thanks for Shopping with Us!</h1>
            <h2>
              {" "}
              You will receive the details in once we have processed your order
            </h2>
            <img
              className="rounded mx-auto d-block"
              src="https://animatedkid.files.wordpress.com/2013/08/madagascar15.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
