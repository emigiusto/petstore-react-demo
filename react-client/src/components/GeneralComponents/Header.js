import React from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import Cart from '../Cart/Cart';
import { useState } from 'react';
import { ProductConsumer } from "../../context";
import {Link} from 'react-router-dom';

export default function Header() {

  const [ isOpen, setCartIsOpen ] = useState(false);

  function cartOpenHandler() {
    setCartIsOpen(true)
  }

  function cartCloseHandler() {
    setCartIsOpen(false)
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <ProductConsumer>
          {(contextstate) => {
            return (
              <Container>
                <Navbar.Brand>
                  <Link className='text-capitalize text-reset text-decoration-none' to="/">Pet Store</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                      <Link to="/product-list" className='text-capitalize text-reset text-decoration-none'>Products</Link>
                  </Nav>
                  <Nav>
                    <Nav.Link onClick={cartOpenHandler}>Cart ({contextstate.cartSize})</Nav.Link>
                      <Link to="/login" className='text-capitalize text-reset text-decoration-none d-flex align-items-center mx-4'>Login</Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            );
          }}
        </ProductConsumer>
      </Navbar>
      {/* { isOpen && <Backdrop onClick={cartCloseHandler}/> } */}
      {isOpen && <Cart onClick={cartCloseHandler} />}
    </div>
  );
}
