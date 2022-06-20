import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../../context";
import { useNavigate } from "react-router-dom";


import Toast from "../GeneralComponents/Toasts/Toast";
import Header from "../GeneralComponents/Header";
import Footer from "../GeneralComponents/Footer";

//Style
import './Register.css';


function Register() {
  const emailAddress = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const deliveryAddress = useRef();
  const password = useRef();

  const [showToast, setShowToast] = useState(false);
  const [categoryToast, setCategoryToast] = useState("danger");
  const [messageToast, setMessageToast] = useState("");

  const navigate = useNavigate();

  //Function to read input data and process it. Currently it only prints to console.
  function submitHandler(event, registerUser) {
    event.preventDefault();

    let newUser = {
      email: emailAddress.current.value,
      password: password.current.value,
      address: deliveryAddress.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
    };

    registerUser(newUser)
      .then(function (result) {
        setShowToast(true)
        setCategoryToast(result.category);
        setMessageToast(result.message)
        if (result.registerState) {
           //Redirects user to last visited page
          setTimeout(function () {
            navigate(-1);
          }, 2000);
        }
    });
  }

  return (
    <div>
      <Header />
      <ProductConsumer>
        {(context) => {
          return (
            <div className="container-sm register-container" >
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  {/*Beginning of registration form */}
                  <form
                    onSubmit={(e) => submitHandler(e, context.registerUser)}
                    className="pb-3 pt-4 px-4 border rounded bg-white shadow-sm form-signin"
                  >
                    {/*Logo*/}
                    <img
                      className="mb-4 d-flex mx-auto form-signin__logo"
                      src="https://img.icons8.com/color/96/000000/dog-bowl.png"
                      alt=""
                      width="80"
                      height="80"
                    />
                    {/*Start of new row */}
                    <div className="row">
                      <div className="col-md-6 col-sm-12 mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          required
                          id="firstName"
                          ref={firstName}
                          className="form-control"
                          placeholder="Yogi"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12 mb-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          required
                          id="lastName"
                          ref={lastName}
                          className="form-control"
                          placeholder="Bear"
                        />
                      </div>
                    </div>
                    {/*Start of new row */}
                    <div className="row">
                      <div className="col-md-6 col-sm-12 mb-3">
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
                      <div className="col-md-6 col-sm-12 mb-3">
                        <label htmlFor="deliveryAddress">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          required
                          id="deliveryAddress"
                          ref={deliveryAddress}
                          className="form-control"
                          placeholder="Cave Avenue 21, 45678"
                        />
                      </div>
                    </div>
                    {/*Start of new row */}
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          required
                          id="password"
                          ref={password}
                          className="form-control"
                          placeholder="password"
                        />
                      </div>
                    </div>
                    {/*Submit Button */}
                    <div className="row">
                      <div className="col-3 m-auto">
                        <button type="submit" className="btn btn-primary">
                          <Link to="/" />
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                  {showToast ? <Toast category={categoryToast} message={messageToast}  show={showToast} /> : <></>}
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

export default Register;
