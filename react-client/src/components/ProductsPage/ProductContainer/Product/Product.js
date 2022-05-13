import React from 'react'
import { useNavigate } from "react-router-dom";
import { Image } from 'react-bootstrap';


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
            <p>{props.product.description}</p>
            <p>€ {props.product.price}</p>
            <div className="d-flex justify-content-between">
            <button id={props.product.id} onClick={routechange} className="btn btn-dark">Product Details</button>
            <button id={props.product.id} onClick={()=>props.handleAddToCart(props.product.id)} className="btn btn-primary">Add to Cart</button>
            </div>
          </div> 
        </div>
    </div>
  )
}
