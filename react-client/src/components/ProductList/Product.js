import React from 'react'


export default function Product(props) {
  return (
    <div>
        <h2>{props.product.title}</h2>
        <p>{props.product.description}</p>
        <p>{props.product.price}</p>
    </div>
  )
}
