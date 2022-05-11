import React from 'react'
import { ProductConsumer } from '../../context';
import Header from '../GeneralComponents/Header'
import Footer from '../GeneralComponents/Footer';
import ProductDetails from './ProductDetails/ProductDetails';
import GoBackButton from '../GeneralComponents/GoBackButton';

export default function ProductDetailsPage(props) {
  return (
    <div>
      <Header />
        <GoBackButton></GoBackButton>
        <ProductConsumer>
            {(contextState) => {
                  return <ProductDetails product={contextState.productInDetail} handleAddToCart={contextState.addToCart}/>
            }}
        </ProductConsumer>
      <Footer />
    </div>
  );
}
