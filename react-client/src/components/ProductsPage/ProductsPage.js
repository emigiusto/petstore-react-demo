import React from 'react'
import Header from '../GeneralComponents/Header'
import Footer from '../GeneralComponents/Footer'
import Filters from './Filters/Filters'
import ProductContainer from './ProductContainer/ProductContainer'

import './ProductsPage.css';

import {ProductConsumer} from '../../context'

export default function ProductsPage() {
  return (
      <div>

          <Header/> 
          <ProductConsumer>{
            (contextState)=>{
                return (<div className="filters-productlist">
                            <Filters contextState={contextState} />
                            <ProductContainer products={contextState.products} 
                                              activeFilters={contextState.activeFilters}
                                              handleAddToCart={contextState.addToCart}
                                              setProductDetail={contextState.setProductDetail}/>
                            </div>
                          )
              }
            }
          </ProductConsumer>
          <Footer/>
      </div>
  )
}
