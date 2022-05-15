import { useRef } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../../context";
import Header from "../GeneralComponents/Header";
import Footer from "../GeneralComponents/Footer";

function RegisterForm() {
  const emailAddress = useRef();
  const password = useRef();

  //Function to read input data and process it. Currently it only prints to console.
  function submitHandler(event, signin) {
    event.preventDefault();
    console.log(event.target);
    signin(emailAddress.current.value, password.current.value);
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
                  <div className="container-sm">
                    {/*Some Bootstrap stuff that is necessary for the form columns to work.*/}
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                    <link
                      rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                      crossOrigin="anonymous"
                    />
                    {/*Beginning of registration form */}
                    <form
                      onSubmit={(e) => submitHandler(e, context.signin)}
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
                      <div className="form-group col-sm-12">
                        <label htmlFor="email">E-Mail Address</label>
                        <input
                          type="text"
                          required
                          id="email"
                          ref={emailAddress}
                          className="form-control"
                        />
                      </div>
                      {/*Start of new row */}
                      <div className="form-group col-sm-12">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          required
                          id="password"
                          ref={password}
                          className="form-control"
                        />
                      </div>
                      {/*Submit Button */}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button type="submit" className="btn btn-primary">
                        <Link to="/" />
                        Login
                      </button>
                    </form>
                  </div>
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

export default RegisterForm;
