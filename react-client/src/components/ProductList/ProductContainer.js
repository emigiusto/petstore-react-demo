import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Product from './Product'

export default function ProductContainer() {

    const [products, setProduct] = useState([])

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(res => {
                console.log(res)
                setProduct(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

  return (
    <div>
        <ul>
            {
            products.map(product => <li key={product.id}><Product title={product.title} description={product.body} price={product.id}/></li>)
            }
        </ul>
    </div>
  )
}
