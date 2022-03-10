import {createFooter} from "../components/footer.js"
import {createHeader} from "../components/header.js"
import { deleteProduct } from "../helperFunctions/cart.js";
import {clearCart} from "/helperFunctions/cart.js"
import {filterProducts} from "/helperFunctions/filter.js"

window.onload = function() {
    displayHeader()
    loadProduct();
    addEventListeners()
    displayFooter()
    handleTotal()
};

var productsList;
var productTotal;

window.handleDeleteProduct = handleDeleteProduct;

function displayHeader() {
    document.getElementById("navbar").innerHTML = createHeader()
}
function displayFooter() {
    document.getElementById("footer").innerHTML = createFooter()
}

function handleTotal() {
    document.getElementById("productTotal").innerHTML = displayTotal(productsList)
}

function displayTotal(productsList) {
    if (productsList.length == 0) {
        return 0
    } else {
        let productTotal;
        productsList.forEach(element => {
        productTotal = productTotal + element.price
    });
    return productTotal
    }
}

function loadProduct() {
    var MyDataString = localStorage.getItem("product-array")
    var data = JSON.parse(MyDataString)
    productsList = data
    render(data)
}

function handleClearCart() {
    clearCart()
    loadProduct()
}

function handleDeleteProduct(id){
    let product = productsList.filter(el => el.id == id)
    let objectProduct = product[0]
    deleteProduct(objectProduct)
}

function addEventListeners() {
    document.getElementById("clearCartButton").addEventListener("click", function() {
        handleClearCart()
    })
}

function render(data) {
    document.getElementById("cartList").innerHTML = ""
    if (data) {
        data.forEach(element => { 
            var newProduct = document.createElement('div');
            newProduct.classList.add('col-sm-4-auto')
             // is a node
            newProduct.innerHTML = `<li class="row">
            <div class="col-lg-3 product-img-layout">
                <img class= "product_img" src="`+ element.image +`" alt="">
            </div>
            <div class="col product-text-container">
                <div class="row">
                    <div class="col">
                        <p>`+ element.title +`</p>
                    </div>
                    <div class="col product-price-container">
                        <p class= "product-text-price">`+ element.price +`</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="product-text-subtext">`+ element.description +`</p>
                    </div>
                    <div class="col product-price-container">
                        <button id="deleteButton" onClick="handleDeleteProduct(` +
                        element.id +
                        `)" type="button" class="btn btn-outline-danger">Delete product</button>
                    </div>
                </div>
            </div>
        </li>`
        document.getElementById("cartList").appendChild(newProduct)
        });
    } else {
        var newProduct = document.createElement('div');
        newProduct.classList.add('col-sm-4.auto')
        newProduct.innerHTML = '<p class="text-center" style="padding-top: 24px;">Your cart is empty</p>'
        document.getElementById("cartList").appendChild(newProduct)
    }
    
}