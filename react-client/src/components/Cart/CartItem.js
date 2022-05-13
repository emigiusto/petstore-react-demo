import React from "react";
import classes from "./Cart.module.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function CartItem(props) {
  return (
    <div className="col-sm-4-auto p-4">
      <div className="d-flex justify-content-between">
        <div className="col">
          <Image src={props.product.image} width={200}></Image>
        </div>
        <div className="col">
          <div>{props.product.title}</div>
          <div className={classes.subtext}>{props.product.description}</div>
          <div className={classes.price}>€ {(props.product.price * props.product.quantity).toFixed(2)}</div>
          <div className="row">
            <div className="col" onClick={() => props.decreaseFromCart(props.product.id)}>
              <div className={classes.quantitybutton}>-</div>
            </div>
            <div className="col text-center">{props.product.quantity}</div>
            <div className="col" onClick={() => props.addToCart(props.product.id)}>
              <div className={classes.quantitybutton}>+</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-end">
            <div
              onClick={() => props.removeProduct(props.product.id)}
              className={classes.buttonhover}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
