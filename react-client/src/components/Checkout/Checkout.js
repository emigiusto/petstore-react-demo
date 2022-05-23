import { ProductConsumer } from "../../context";
import Header from "../GeneralComponents/Header";
import Footer from "../GeneralComponents/Footer";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  /* function thought to redirect to orderCompleted AND to close the order, could not implement the second */
  function handleSubmit(completeCheckout, e) {
    e.preventDefault();
    navigate("/ordercompleted"); 
    let billingAddress = document.getElementById("billingAddress").value;
    console.log("Billing address is : " + billingAddress);
    completeCheckout(billingAddress);
  }

  return (
    <div>
      <Header />
      <div className="m-auto my-4 p-4">
        <h1 className="d-flex justify-content-center">Your checkout details</h1>
      </div>
      <ProductConsumer>
        {(context) => {
          if (context.cart.length === 0) {
            return (
              <div className="row justify-content-center p-4">
                <h4>Please add some items before checkout</h4>
              </div>
            );
          }

          return (
            <div className="container-sm">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  {/*Beginning of checkout form */}
                  <form
                    className="pb-3 pt-4 px-4 border rounded bg-white shadow-sm form-signin"
                    onSubmit={(e) => handleSubmit(context.completeCheckout, e)}
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
                    <div className="container">
                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-12">
                          <label htmlFor="billingAddress">
                            Billing Address
                          </label>
                          <input
                            id="billingAddress"
                            name="billingAddress"
                            type="text"
                            required
                            /*                           defaultValue={context.user.address || ""} */
                            defaultValue=""
                            className="form-control"
                            placeholder="Yogi"
                          />
                        </div>

                        <div className="col-lg-6 col-md-12">
                          <label htmlFor="deliveryAddress">
                            Delivery Address
                          </label>
                          <input
                            id="deliveryAddress"
                            type="text"
                            required
                            className="form-control"
                            placeholder="Cave Avenue 21, 45678, Jellystone National Park, Wyoming USA"
                          />
                        </div>
                      </div>

                      {/*Start of new row */}

                      <div className="row mb-3">
                        <div className="col-lg-6 col-md-12">
                          <label htmlFor="email">E-Mail Address</label>
                          <input
                            id="email"
                            type="text"
                            required
                            defaultValue=""
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6 col-md-12">
                          <div className="col">
                            <label htmlFor="firstName">First Name</label>
                            <input
                              id="firstName"
                              type="text"
                              required
                              defaultValue=""
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                          <div className="col col order-last">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                              id="lastName"
                              type="text"
                              required
                              defaultValue=""
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*Start of new row */}
                    <div className="container">
                      <div className="row mb-3">
                        <div className="col-12">
                          <label htmlFor="cardDetails">Card Details</label>
                          <input
                            type="text"
                            required
                            id="cardDetails"
                            defaultValue=""
                            /* ref={cardDetails} */
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
                            className="form-control"
                            placeholder="For example: 123"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <h4> Total: € {context.cartTotal} </h4>

                      {/*Submit Button */}

                      <div className="row mb-3">
                        <div className="col-3">
                          <button type="submit" className="btn btn-primary">
                            Complete Purchase
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
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
