import React, { Component } from 'react';

const ProductContext = React.createContext()
//Context has 2 components
    //Provider
    //Consumer

class ProductProvider extends Component {
    state={
        products: [],
        cart: [],
        cartTotal: 0
    }
    
    componentDidMount(){
        this.setProducts();
    }

    //Method to copy original values and set them on state (products property)
    setProducts = async () =>{
        const storeProducts = await fetch("http://localhost:3005/products")
        const data = await storeProducts.json();//Fill data with API endpoint response
        let tempProducts = []
        data.products.forEach(item=>{
            tempProducts = [...tempProducts,item];
        })
        this.setState(()=>{
            return {products: tempProducts}
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, //deconstruction of state
                addToCart: this.addToCart,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer
export {ProductProvider,ProductConsumer};