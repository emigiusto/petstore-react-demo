import React from 'react'
import Header from '../GeneralComponents/Header'
import Footer from '../GeneralComponents/Footer'
import Filters from './Filters/Filters'
import ProductContainer from './ProductContainer/ProductContainer'
import LoginNav from '../GeneralComponents/LoginNav'


import {ProductConsumer} from '../../context'

export default function ProductsPage() {
  return (
      <div>
        
          <Header/>
          <LoginNav></LoginNav>
          <Filters/>
          <ProductConsumer>{
              (contextState)=>{
                return <ProductContainer  products={contextState.products} 
                                          activeFilters={contextState.activeFilters}
                                          handleAddToCart={contextState.addToCart}
                                          setProductDetail={contextState.setProductDetail}/>
              }
            }
          </ProductConsumer>
          <Footer/>
        
      </div>
  )
}
