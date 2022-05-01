import React from 'react'
import Header from '../GeneralComponents/Header'
import Footer from '../GeneralComponents/Footer'
import Filters from './Filters'
import ProductContainer from './ProductContainer'

export default function ProductList() {
  return (
      <div>
        <Header/>
        <Filters/>
        <ProductContainer/>
        <Footer/>
      </div>
  )
}
