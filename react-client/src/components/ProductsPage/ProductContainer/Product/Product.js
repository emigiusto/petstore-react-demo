import React from 'react'
import { useNavigate } from "react-router-dom";


export default function Product(props) {

  let navigate = useNavigate();
  const routechange = () => {
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
            <p>{props.product.price}</p>
            <button id={props.product.id} onClick={routechange} className="btn btn-success align-self-end">Product Details</button>
          </div> 
        </div>
    </div>
  )
}
