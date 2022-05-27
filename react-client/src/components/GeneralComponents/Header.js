import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Cart from "../Cart/Cart";
import { useState } from "react";
import { ProductConsumer } from "../../context";
import { Link } from "react-router-dom";
import LoginLogoutButton from "./LoginLogoutButton";
import "./Header.css";

export default function Header() {
  const [isOpen, setCartIsOpen] = useState(false);

  function cartOpenHandler() {
    setCartIsOpen(true);
  }

  function cartCloseHandler() {
    setCartIsOpen(false);
  }

  return (
    <div className="stickyheader">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <ProductConsumer>
          {(contextstate) => {
            return (
              <Container>
                <Navbar.Brand className="d-flex align-middle">
                  <Link
                    className="text-capitalize text-reset text-decoration-none nav-link"
                    to="/"
                  >
                    Pet Store
                  </Link>
                  <Nav.Link
                    to="/product-list"
                    className="text-capitalize text-reset text-decoration-none mr-2 text-secondary"
                  >
                    Products
                  </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                  id="responsive-navbar-nav"
                  className="justify-content-end mobile-hamburger"
                >
                  <Nav className="d-flex">
                    <Nav.Link
                      onClick={cartOpenHandler}
                      className="d-flex text-secondary mr-2"
                    >
                      Cart ({contextstate.cartSize})
                    </Nav.Link>
                    <Nav.Link className=" text-secondary">
                      {contextstate.user
                        ? "Hej " + contextstate.user.firstName
                        : ""}
                    </Nav.Link>
                    <LoginLogoutButton
                      userId={contextstate.userId}
                      signout={contextstate.signout}
                      className="mr-2"
                    />
                    <Nav.Link
                      to="/register"
                      className="text-capitalize text-decoration-none mr-2 text-secondary"
                    >
                      Register
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            );
          }}
        </ProductConsumer>
      </Navbar>
      {isOpen && <Cart onClick={cartCloseHandler} />}
    </div>
  );
}
