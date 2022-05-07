import React from 'react'


export default function Product(props) {
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
            <button id={props.product.id} onClick={()=>props.handleAddToCart(props.product.id)} className="btn btn-success align-self-end">Add to Cart</button>
          </div> 
        </div>
    </div>
  )
}
