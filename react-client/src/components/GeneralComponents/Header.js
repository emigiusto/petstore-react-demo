import React from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import Backdrop from './Backdrop/Backdrop'
import Cart from '../Cart/Cart';
import { useState } from 'react';

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
        <Container>
          <Navbar.Brand /* href="#home" */>Pet Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link /* href="#features" */>Products</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={cartOpenHandler}>Cart</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      { isOpen && <Backdrop onClick={cartCloseHandler}/> }
      { isOpen && <Cart onClick={cartCloseHandler}/> }

    </div>
  );
}
