import { ProductConsumer } from "../../context";
import classes from "./Checkout.module.css";
import context from "react-bootstrap/esm/AccordionContext";
import Header from "../GeneralComponents/Header";
import Footer from "../GeneralComponents/Footer";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toast } from "react-bootstrap";


export default function Checkout(props){ 
  const billingAddress = useRef();
  const deliveryAddress = useRef();
  const cardDetails = useRef();
  const CVV = useRef();
  const emailAddress = useRef();
  const [toastState, setToastState] = useState({ show: false, text: "" });    

    function renderToast(result) {
        result === "Your Order is on its way!"
        ? setToastState({ show: true, text: result, success: true })
        : setToastState({ show: true, text: result, success: false });
        removeToasts();
    }   
    function removeToasts() {
      setTimeout(function () {
        setToastState({ show: false });
      }, 5000);
    }   

    function submitHandler(event, checkoutForm) {
      event.preventDefault();  
       
      let newCheckout = {
        cardDetails: cardDetails.current.value,
        CVV: CVV.current.value,
        billingAddress: billingAddress.current.value,
      };    
      checkoutForm(newCheckout).then(function (result) {
        renderToast(result.registerState);
      });
    }   
    return(
      <div>
          <Header/> 
          <div className="m-auto my-4 p-4"><h1 className="d-flex justify-content-center">Your checkout details</h1></div>
          <ProductConsumer>
          {(context) => {
        
          return( 
          <div className="container-sm">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                {/*Beginning of checkout form */}
                <form
                  onSubmit={(e) => submitHandler(e, context.newCheckoutForm)}
                  className="pb-3 pt-4 px-4 border rounded bg-white shadow-sm form-signin"
                >
                  {/*Logo*/}
                  <img
                    className="mb-4 d-flex mx-auto form-signin__logo"
                    src="https://image.shutterstock.com/image-photo/labradoodle-dog-ordering-online-by-600w-1938261973.jpg"
                    alt=""
                    width="80"
                    height="80"
                  />
                  {/*Start of new row */}
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="billingAddress">Billing Address</label>
                      <input
                        type="text"
                        required
                        id="billingAddress"
                        ref={ billingAddress }
                        className="form-control"
                        placeholder="Yogi"
                      />
                    </div>
                    <p>{ context.cartTotal }</p>
                    <div className="col-6">
                      <label htmlFor="deliveryAddress">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        id="deliveryAddress"
                        ref={deliveryAddress}
                        value = "Your house"
                        className="form-control"
                        placeholder="Cave Avenue 21, 45678, Jellystone National Park, Wyoming USA"
                      />
                    </div>
                    </div>
                  {/*Start of new row */}
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="email">E-Mail Address</label>
                      <input
                        type="text"
                        required
                        id="email"
                        ref={emailAddress}
                        className="form-control"
                        placeholder="heyheyhey@yogibear.com"
                      />
                    </div>

                </div>

                  {/*Start of new row */}
                  <div className="row mb-3">
                    <div className="col-12">
                      <label htmlFor="cardDetails">Card Details</label>
                      <input
                        type="text" 
                        required
                        id="cardDetails"
                        ref={cardDetails}
                        className="form-control"
                        placeholder="card details"
                      />
                    </div>
                  </div>
                    {/*Insert if function to make CreditCard disappear once selected "paypal" */}
                    
                   
                  <div className="row mb-3">
                    <div className="col-12">
                      <label htmlFor="CVV">CVV Card Code</label>
                      <input
                        type="password" 
                        required
                        id="CVV"
                        ref={CVV}
                        className="form-control"
                        placeholder="cardCode"
                      />
                    </div>
                  </div>
                  <h4>Total: € {context.cartTotal} </h4>

                  {/*Submit Button */}             


                  <div className="row mb-3">
                    <div className="col-3">
                      <button type="submit" className="btn btn-primary">
                        <Link to="/" />
                        Complete Purchase
                      </button>
                    </div>
                  </div>
                </form>
                {toastState.show && <Toast state={toastState} />}
              </div>
            </div>
          </div>          
        );
        }}
        </ProductConsumer>
        <Footer/>
        </div>
    )
}