import classes from "./Cart.module.css";
import React from 'react'
import { Button, ModalTitle } from "react-bootstrap";
import { ProductConsumer } from "../../context";
import CartItem from "./CartItem";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Cart(props) {

  function getProduct(id, products) {
    console.log(products)
    return products.find((product) => product.id === id)
  }

  return (
    <div>
      <Modal show={true} size="lg">
        <Modal.Header>
          <ModalTitle>Cart</ModalTitle>
          <div onClick={props.onClick}>
          <h2>
            <FontAwesomeIcon icon={faXmark} />
          </h2>
        </div>
        </Modal.Header>
        <Modal.Body>
          <ProductConsumer>
            {(contextstate) => {
              let transformedArray = contextstate.cart.map((element) => {
                if (element) {
                  return getProduct(element.productid, contextstate.products);
                }
              });
              return transformedArray.map((product) => {
                return <CartItem product={product} key={product.id} />;
              });
            }}
          </ProductConsumer>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button variant="dark w-100 p-3">Go to checkout</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
