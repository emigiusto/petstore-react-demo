import React from "react";
import classes from "./Cart.module.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function CartItem(props) {
  return (
    <div className="col-sm-4-auto p-4">
      <div className="row d-flex justify-content-between">
        <div className="col-md-5 sm-col-3 d-flex justify-content-center">
          <Image src={props.product.image} className={classes.imageResp}></Image>
        </div>
        <div className="col-md-5 sm-col-3">
          <div>{props.product.title}</div>
          <div className={classes.subtext}>{props.product.description}</div>
          <div className={classes.price}>€ {(props.product.price * props.product.quantity).toFixed(2)}</div>
          <div className="row justify-content-center px-6">
            <div className="col" onClick={() => props.decreaseFromCart(props.product.id)}>
              <div className={classes.quantitybutton}>-</div>
            </div>
            <div className="col text-center">{props.product.quantity}</div>
            <div className="col" onClick={() => props.addToCart(props.product.id)}>
              <div className={classes.quantitybutton}>+</div>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="d-flex justify-content-center">
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
