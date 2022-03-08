import {createFooter} from "../components/footer.js"
import {createHeader} from "../components/header.js"
import {clearCart} from "/helperFunctions/cart.js"

window.onload = function() {
    displayHeader()
    loadProduct();
    addEventListeners()
    renderFooter();
    renderHeader();
    displayFooter()
};

function displayHeader() {
    document.getElementById("navbar").innerHTML = createHeader()
}
function displayFooter() {
    document.getElementById("footerCart").innerHTML = createFooter()
}

function loadProduct() {
    var MyDataString = localStorage.getItem("product-array")
    var data = JSON.parse(MyDataString)
    render(data)
}

function renderFooter(){
    document.getElementById("footer").innerHTML = createFooter();
}

function renderHeader(){
    document.getElementById("header").innerHTML = createHeader();
}

function addEventListeners(){}

function handleClearCart() {
    clearCart()
    loadProduct()
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