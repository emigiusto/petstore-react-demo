import {toast} from "../helperFunctions/toast.js";
//Clears the cart in local storage - NOT BEING USED - Only for testing in the console
export function clearCart() {
    localStorage.removeItem("product-array");
}

//Add to cart function. Will never run before products are loaded "loadProducts()", 
//so it's safe from the asynchronous perspective ;)
export function addToCart(newProduct) {
    let currentProductList = JSON.parse(localStorage.getItem("product-array"));
    if (currentProductList) { //1) Cart is not empty
        var found = currentProductList.find(element => element.id == newProduct.id)
        if (found) { //1) a) Product is already on the cart --- Add one unit!
            currentProductList = currentProductList.filter(product => product.id != newProduct.id)
            let updatedProduct = { amount: found.amount + 1, ...newProduct }
            currentProductList.push(updatedProduct)
            //console.log("Product with id " + id + " has been added. The product was already on the cart, +1 amount updated")

        } else { //1) b) Product is NOT on the cart --- Add product
            currentProductList.push({ amount: 1, ...newProduct })
            //console.log("Product with id " + id + " has been added. Cart didn't have the product")
        }
    } else { //2) Cart is empty
        currentProductList = []
        currentProductList.push({ amount: 1, ...newProduct })
        //console.log("Product with id " + id + " has been added. Cart was empty")
    }
    localStorage.setItem("product-array", JSON.stringify(currentProductList));
    toast("Product added to cart","success")
    console.log("Updated Cart:")
    console.log(currentProductList)
}