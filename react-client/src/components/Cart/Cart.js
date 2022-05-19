import classes from "./Cart.module.css";
import React from "react";
import { Button, ModalTitle } from "react-bootstrap";
import { ProductConsumer } from "../../context";
import CartItem from "./CartItem";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Cart(props) {
  
  function getProduct(id, products, quantity) {
    return {
      ...products.find((product) => product.id === id),
      quantity: quantity,
    };
  }
  return (
    <div>
      <Modal show={true} size="lg">
        <Modal.Header>
          <ModalTitle>Cart</ModalTitle>
          <div className={classes.buttonhover} onClick={props.onClick}>
            <h2>
              <FontAwesomeIcon icon={faXmark} />
            </h2>
          </div>
        </Modal.Header>
        <Modal.Body>
          <ProductConsumer>
            {(contextstate) => {
              if (contextstate.cart.length === 0) {
                return <div className="row justify-content-center p-4">Your cart is empty</div>;
              }
              return (
                  <>
                    <div className = "row justify-content-end">
                      <div onClick={() => contextstate.clearCart()} className={classes.clearcart}>Clear cart</div>
                    </div>
                    {contextstate.cart.map((element) => {
                      let product = getProduct(element.productid,contextstate.products,element.quantity);
                      return (
                        <CartItem
                          decreaseFromCart={contextstate.decreaseFromCart}
                          addToCart={contextstate.addToCart}
                          removeProduct={contextstate.removeProduct}
                          key={product.id}
                          product={product}
                        ></CartItem>
                      );
                    })}
                    <div onClick={() => contextstate.setCartTotal()}> Total: € {contextstate.cartTotal}</div>
                  </>
                )
            }}
          </ProductConsumer>
        </Modal.Body>
        <Modal.Footer>
          <div>
              <Link to="./checkout">
            <Button variant="dark w-100 p-3">Go to checkout</Button>
              </Link>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
