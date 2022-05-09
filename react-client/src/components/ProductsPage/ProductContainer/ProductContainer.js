import React from 'react'
import Product from './Product/Product'
import {ProductConsumer} from '../../../context'

export default function ProductContainer() {
    return (
        <div  className="main__section__products row">
            <ProductConsumer>
                {
                    (contextState)=>{
                        return contextState.products.map(product=>{
                            return <Product key={product.id} 
                                            product={product} 
                                            handleAddToCart={contextState.addToCart}
                                            setProductDetail={contextState.setProductDetail}
                                    ></Product>
                        })
                    }
                }
            </ProductConsumer> 
        </div>
    )}