import React from "react";
import { Link } from "react-router-dom";

import Header from '../GeneralComponents/Header'
import Footer from '../GeneralComponents/Footer'
import ProductListFiltered from './ProductListFiltered/ProductListFiltered'

import './Home.css';

import {ProductConsumer} from '../../context'

function Home() {
  return (
    <div>
    <Header/> 
    <div className="p-4 welcome"><h1 className="d-flex justify-content-center">Welcome to Pet Store</h1></div>
    <ProductConsumer>{
      (contextState)=>{
          return (
                    <div className="filters-productlist">
                        <h2 className="py-4 m-2">Offers!</h2>
                        <ProductListFiltered  products={contextState.products} 
                                              activeFilters={contextState.activeFilters}
                                              handleAddToCart={contextState.addToCart}
                                              setProductDetail={contextState.setProductDetail}
                                              filteredBy={"offer"}/>
                        <Link to="/product-list">See more</Link>
                        <h2 className="py-4 m-2">Check out our new Arrivals!</h2>
                        <ProductListFiltered  products={contextState.products} 
                                              activeFilters={contextState.activeFilters}
                                              handleAddToCart={contextState.addToCart}
                                              setProductDetail={contextState.setProductDetail}
                                              filteredBy={"arrival"}/>
                        <Link to="/product-list">See more</Link>
                        <h2 className="py-4 m-2">Free delivery ordering this week</h2>
                        <ProductListFiltered  products={contextState.products} 
                                              activeFilters={contextState.activeFilters}
                                              handleAddToCart={contextState.addToCart}
                                              setProductDetail={contextState.setProductDetail}
                                              filteredBy={"delivery"}/>
                        <Link to="/product-list">See more</Link>
                      </div>
                    )
        }
      }
    </ProductConsumer>
    <Footer/>
</div>
  );
}

export default Home;
