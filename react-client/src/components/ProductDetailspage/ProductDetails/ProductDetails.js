import React from 'react'

export default function ProductDetails(props) {
  return (
    <div className="row p-5 mx-5">
        <div className="col-sm">
            <div class="col px-2 pb-2">
                <h3>{props.product.title}</h3>
            </div>

            <div className="col px-2 pb-2">
                {props.product.description}
            </div>

            <div className="col px-2 pb-2">
                <h3>{props.product.price}</h3>
            </div>

            <div className="col px-2 pb-2">
                <button /* onClick="handleAddToCart()" */ type="button" className="btn btn-dark">Add to cart</button>
            </div>
        </div>
        <div className="col-sm">
          <div className="col-sm-12 d-flex justify-content-center">
              <img src={props.product.image} alt={props.product.image}/>
          </div>
        </div>
        

    </div>
  )
}
