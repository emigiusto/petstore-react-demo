import React from 'react'
import { useParams } from 'react-router-dom';
import { ProductConsumer } from '../../context';
import Header from '../GeneralComponents/Header'
import Footer from '../GeneralComponents/Footer';
import ProductDetails from './ProductDetails/ProductDetails';

export default function ProductDetailsPage(props) {

  const {id} = useParams();
  return (
    <div>
      <Header />
        <ProductConsumer>
            {(contextState) => {
                let pDetails = contextState.products.find((product) => product.id === id);
                return <ProductDetails product = {pDetails}/>
            }}
        </ProductConsumer>
      <Footer />
    </div>
  );
}
