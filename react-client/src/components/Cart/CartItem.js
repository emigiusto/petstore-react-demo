import React from 'react'
import classes from "./Cart.module.css";
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function CartItem(props) {
  return (
    <div className="col-sm-4-auto">
      <div className="d-flex justify-content-between">
        <div className="col">
          <Image src={props.product.image} width={100}></Image>
        </div>
        <div className="col">
          <div>{props.product.title}</div>
          <div className={classes.subtext}>{props.product.description}</div>
        </div>
        <div className="col">
          <div>{props.product.price}</div>
        </div>
        <div className="d-flex justify-content-end">
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      </div>
    </div>
  );
}
