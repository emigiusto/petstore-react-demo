import React, { useState, useEffect } from 'react'
import Product from './Product/Product'

export default function ProductContainer(props) {
    /* const [localActiveFilters, setActiveFilters] = useState([]); */
    const [productList, setProductList] = useState([]);

    const filterProducts = () =>{
        let filtered = props.products.filter(filterProductByActiveFilters)
        return filtered
    }

    const filterProductByActiveFilters = (product) =>{
        for (let index = 0; index < props.activeFilters.length; index++) {
            const filterElement = props.activeFilters[index];
            if (product[filterElement.filter].toLowerCase().trim().replace(/\s/g, '') !== filterElement.option.toLowerCase().trim().replace(/\s/g, '')) {
                return false
            }
        }
        return true
    }

    //Use effect clauses to update products when they change or the filters change
    useEffect(() => {
        setProductList(filterProducts())
    },[props.activeFilters]);
    
    useEffect(() => {
        setProductList(props.products)
    },[props.products]);



    return (
        <div  className="main__section__products row">
            {
                productList.map(product=> {
                        return (<Product key={product.id} 
                                        product={product} 
                                        handleAddToCart={props.handleAddToCart}
                                        setProductDetail={props.setProductDetail}
                                ></Product>)
                    })
            }
        </div>
    )}