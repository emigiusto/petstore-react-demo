import {toast} from "../helperFunctions/toast.js";

//Clears the cart in local storage - Should be combined with a refresh in rendering
export function clearCart() {
    localStorage.removeItem("product-array");
}

/*  Function to add products to the cart. Will never run before products are loaded "loadProducts()", 
    so it's safe from the asynchronous perspective ;)
    Receives a Product object as parameter and updates the local storage. Example:
    {
        "handle": "royal-canin-obesity-management-dp-42-feline",
        "id": 10,
        ...
        "key": value
    }
    Triggers a Bootstrap toast with a success message
*/
export function addToCart(newProduct) {
    let currentProductList = JSON.parse(localStorage.getItem("product-array"));
    if (currentProductList) { //1) Cart is not empty
        var found = currentProductList.find(element => element.id == newProduct.id)
        if (found) { //1) a) Product is already on the cart --- Add one unit!
            currentProductList = currentProductList.filter(product => product.id != newProduct.id)
            let updatedProduct = { amount: found.amount + 1, ...newProduct }
            currentProductList.push(updatedProduct)
        } else { //1) b) Product is NOT on the cart --- Add product
            currentProductList.push({ amount: 1, ...newProduct })
        }
    } else { //2) Cart is empty
        currentProductList = []
        currentProductList.push({ amount: 1, ...newProduct })
    }
    localStorage.setItem("product-array", JSON.stringify(currentProductList));
    toast("Product added to cart","success")
    console.log("Updated Cart:")
    console.log(currentProductList)
}