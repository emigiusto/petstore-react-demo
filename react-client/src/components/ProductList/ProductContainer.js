import React/* , {useState,useEffect} */ from 'react'
/* import axios from 'axios' */
import Product from './Product'

import {ProductConsumer} from '../../context'

export default function ProductContainer() {

/*     const [products, setProduct] = useState([]) */

/*     useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(res => {
                console.log(res)
                setProduct(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []) */

  return (
    <ProductConsumer>
        {(contextState)=>{
            return contextState.products.map(product=>{
                return <Product key={product.id} product={product}></Product>
            })
        }}
    </ProductConsumer>
  )
}
