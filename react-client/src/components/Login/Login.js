import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../../context";

import Header from "../GeneralComponents/Header";
import Footer from "../GeneralComponents/Footer";
import Toast from "../GeneralComponents/Toasts/Toast";

function LoginForm() {
  const emailAddress = useRef();
  const password = useRef();

  const [toastState, setToastState] = useState({ show: false, text: "" });

  //Function to read input data and process it. Currently it only prints to console.
  function submitHandler(event, signin, context) {
    event.preventDefault();
    console.log(event.target);
    signin(emailAddress.current.value, password.current.value).then(function (
      result
    ) {
      renderToast(result.loginState);
    });
  }

  function renderToast(result) {
    result === "You are now logged in!"
      ? setToastState({ show: true, text: result, success: true })
      : setToastState({ show: true, text: result, success: false });
    removeToasts();
  }

  function removeToasts() {
    setTimeout(function () {
      setToastState({ show: false });
    }, 5000);
  }

  return (
    <div>
      <Header />
      <ProductConsumer>
        {(context) => {
          return (
            <div className="container-sm">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  {/*Beginning of registration form */}
                  <form
                    onSubmit={(e) => submitHandler(e, context.signin, context)}
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
                    <div className="row mb-3">
                      <div className="col-12">
                        <label htmlFor="email">E-Mail Address</label>
                        <input
                          type="text"
                          required
                          id="email"
                          ref={emailAddress}
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/*Start of new row */}
                    <div className="row mb-3">
                      <div className="col-12">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          required
                          id="password"
                          ref={password}
                          className="form-control"
                        />
                      </div>
                    </div>
                    {/*Submit Button */}
                    <div className="row mb-3">
                      <div className="col-3">
                        <button type="submit" className="btn btn-primary">
                          <Link to="/" />
                          Login
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
      <Footer />
    </div>
  );
}

export default LoginForm;
