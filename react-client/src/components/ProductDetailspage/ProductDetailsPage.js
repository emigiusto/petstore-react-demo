import React from 'react'
import { useParams } from 'react-router-dom';
import { ProductConsumer } from '../../context';
import Header from '../GeneralComponents/Header'
import Footer from '../GeneralComponents/Footer';
import ProductDetails from './ProductDetails/ProductDetails';
import GoBackButton from '../GeneralComponents/GoBackButton';

export default function ProductDetailsPage(props) {

  const {id} = useParams();
  return (
    <div>
      <Header />
        <GoBackButton></GoBackButton>
        <ProductConsumer>
            {(contextState) => {
                if (contextState.products.length !== 0){
                let pDetails = contextState.products.find((product) => product.id === id);
                return <ProductDetails product = {pDetails}/>
                } else {
                    return <div>Placeholder</div>
                }
            }}
        </ProductConsumer>
      <Footer />
    </div>
  );
}
