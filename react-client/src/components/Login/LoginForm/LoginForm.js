import { useRef } from "react";
import classes from "./LoginForm.module.css";
import { Link } from "react-router-dom";

function RegisterForm() {
  const emailAddress = useRef();
  const password = useRef();

  //Function to read input data and process it. Currently it only prints to console.
  function submitHandler(event) {
    event.preventDefault();
    const enteredEmailAddress = emailAddress.current.value;
    const enteredpassword = password.current.value;

    console.log(enteredEmailAddress);
    console.log(enteredpassword);
  }

  return (
    <div className={classes.modal}>
      {/*Some Bootstrap stuff that is necessary for the form columns to work.*/}
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />

      {/*Beginning of registration form */}
      <form
        onSubmit={submitHandler}
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
        <div className="form-group">
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
        <div className="form-group">
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
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
