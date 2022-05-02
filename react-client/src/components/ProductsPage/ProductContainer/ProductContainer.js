import React/* , {useState,useEffect} */ from 'react'
/* import axios from 'axios' */
import Product from './Product/Product'

import {ProductConsumer} from '../../../context'

export default function ProductContainer() {
    return (
        <div  className="main__section__products row">
            <ProductConsumer>
                {
                    (contextState)=>{
                        return contextState.products.map(product=>{
                            return <Product key={product.id} product={product}></Product>
                        })
                    }
                }
            </ProductConsumer> 
        </div>

    )
}