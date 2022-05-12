import React, { useState, useEffect } from 'react'
import Product from '../../ProductsPage/ProductContainer/Product/Product'

export default function ProductListFiltered(props) {
    const [productList, setProductList] = useState([]);

    const filterProducts = (products,filteredBy, n) =>{
        let filtered = products.filter(product => product[filteredBy]).slice(0,n)
        return filtered
    }

    useEffect(() => {
        setProductList(filterProducts(props.products,props.filteredBy,4))
    },[props.products]);

    return (
        <div  className="main__section__products row">
            {   
                productList.map(product=> {
                        return (<Product    key={product.id} 
                                            product={product} 
                                            handleAddToCart={props.handleAddToCart}
                                            setProductDetail={props.setProductDetail}
                                ></Product>)
                    })
            }
        </div>
    )}