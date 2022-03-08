import {createFooter} from "../components/footer.js"
import {createHeader} from "../components/header.js"

window.onload = function() {
    loadProduct();
    addEventListeners()
    renderFooter();
    renderHeader();
};
var data;
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

function render(data) {
    data.forEach(element => { 
        var newProduct = document.createElement('div');
        newProduct.classList.add('col-sm-4')
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
}