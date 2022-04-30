import {toast} from "./toast.js";
import {handleCartSize} from "../cart/cart.js"

//Clears the cart in local storage - Should be combined with a refresh in rendering
export function clearCart() {
    localStorage.removeItem("product-array");
    localStorage.removeItem("cart size")
}

/* export function deleteProduct(productTodelete) {

    let cartProducts = JSON.parse(localStorage.getItem("product-array"))
    if (productTodelete.amount > 1) {
        let newProducts = cartProducts.filter(el => el.id !== productTodelete.id);$
        let updatedProduct = { amount: productTodelete.amount - 1, ...productTodelete }
        newProducts.push(updatedProduct)
        localStorage.setItem("product-array", JSON.stringify(newProducts));
        let cartString = localStorage.getItem("cart size")
        let cartInt = parseInt(cartString)
        localStorage.setItem("cart size", cartInt - 1)  
    } else {
        let newProducts = cartProducts.filter(el => el.id !== productTodelete.id);
        console.log(cartProducts)
        console.log(newProducts)
        localStorage.setItem("product-array", JSON.stringify(newProducts))
        let cartString = localStorage.getItem("cart size")
        let cartInt = parseInt(cartString)
        localStorage.setItem("cart size", cartInt - 1)   
    }
} */

export function deleteProduct(productTodelete) {
    let cartProducts = JSON.parse(localStorage.getItem("product-array"))
    let productIndex = cartProducts.findIndex(
      (el) => el.id === productTodelete.id
    )
  
    let productToUpdate = cartProducts[productIndex]
  
    if (productToUpdate.amount === 1) {
      cartProducts.splice(productIndex, 1)
    } else {
      productToUpdate = {
        ...productToUpdate,
        amount: productToUpdate.amount - 1,
      }
      cartProducts[productIndex] = productToUpdate
    }
    console.log(cartProducts)
    localStorage.setItem("product-array", JSON.stringify(cartProducts))
  
    const cartSize = cartProducts.length
    console.log("Cart size: ", cartSize)
    localStorage.setItem("cart size", cartSize)

    return cartProducts
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
    if (localStorage.getItem('cart size') !== null) {
        let cartString = localStorage.getItem("cart size")
        let cartInt = parseInt(cartString)
        console.log(cartInt)
        localStorage.setItem("cart size", cartInt + 1)
    } else {
        localStorage.setItem("cart size", 1)
    }
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
    handleCartSize()
    
}