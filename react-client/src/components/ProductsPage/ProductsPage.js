import React from 'react'
import Header from '../GeneralComponents/Header'
import Footer from '../GeneralComponents/Footer'
import Filters from './Filters/Filters'
import ProductContainer from './ProductContainer/ProductContainer'
import LoginNav from '../GeneralComponents/LoginNav'

export default function ProductsPage() {
  return (
      <div>
        <Header/>
        {/* <LoginNav></LoginNav> */}
        <Filters/>
        <ProductContainer/>
        <Footer/>
      </div>
  )
}
