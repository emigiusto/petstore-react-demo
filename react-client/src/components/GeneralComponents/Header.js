import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Pet Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
            <Link
            className="dropdown-item"
            to="/product-list"
          >
            Products
          </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link id="numCartItems" className="nav-link" aria-current="page" to="/cart">
                Cart { cart }
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/login">

          { name }      
              </Link>
            </li>
          </ul>
        </div>
      </div>       
    </nav>
  </div>
  );
}

function cart() {
  var cartsize;
  if (localStorage.getItem("cart size") == null) {
    cartsize = "0"
  } else if (localStorage.getItem("cart size") < 0) {
    cartsize = "0"
  } else {
    cartsize = localStorage.getItem("cart size");
  }
  return cartsize;
}

function name() {
  if (localStorage.firstName != null) {
    let greeting = (localStorage.getItem("firstName"));
    return greeting;
  }
  return "Login";
}
