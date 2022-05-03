import React from 'react'
import Header from '../GeneralComponents/Header'
import Footer from '../GeneralComponents/Footer'
import Filters from './Filters/Filters'
import ProductContainer from './ProductContainer/ProductContainer'

export default function ProductsPage() {
  return (
      <div>
        <Header/>
        <Filters/>
        <ProductContainer/>
        <Footer/>
      </div>
  )
}
