import React from 'react'
import { useNavigate } from "react-router-dom";

import './Product.css';

export default function Product(props) {

  let navigate = useNavigate();

  const routechange = () => {
    props.setProductDetail(props.product)
    let path = '/product-list/' + props.product.id
    navigate(path)
  }

  return (
    <div className='col-sm-4 col-lg-3'>
        <div className="card mb-4">
          <div>
            <img src={props.product.image} className="card-img-top p-4 card__image" alt={props.product.id}/>
          </div>
          <div className="card-body">
            <h5 className="card-title card__body__title">{props.product.title}</h5>
            <p className="card-title card__body__description">{props.product.description}</p>
            <p>{props.product.price} eu</p>
            <div className="d-flex justify-content-between">
            <button className="btn btn-dark card__body__details" id={props.product.id} onClick={routechange}>Details</button>
            <button className="btn btn-primary card__body__addtocart" id={props.product.id} onClick={()=>props.handleAddToCart(props.product.id)} >Add to Cart</button>
            </div>
          </div> 
        </div>
    </div>
  )
}
