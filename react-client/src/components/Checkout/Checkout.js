import { ProductConsumer } from "../../context";
import classes from "./Checkout.module.css";
import Header from "../GeneralComponents/Header";
import Footer from "../GeneralComponents/Footer";

export default function Checkout(props){

    return(
        <div>
            <Header/> 
            <div className="m-auto my-4 p-4"><h1 className="d-flex justify-content-center">Your checkout details</h1></div>
            <ProductConsumer>{
                (contextState) =>{
                    return(
                        <div className="col-md-8 mx-auto">
                <div className="py-5 text-center">
                                We need a store logo image below, just put a placeholder 
                    <h2>Checkout page</h2>
                    <p className="lead">Checkout For your order by filling out the following form</p>
                    </div>
                </div> 
                    )
                    
                }   
            }

            </ProductConsumer>
            <Footer/>
        </div>
    )
}