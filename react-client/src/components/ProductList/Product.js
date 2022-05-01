import React from 'react'


export default function Product(props) {
  return (
    <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p>{props.price}</p>
    </div>
  )
}
