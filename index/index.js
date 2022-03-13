import {createFooter} from "../components/footer.js"
import { filterProducts } from "../helperFunctions/filter.js";
import {createHeader} from "../components/header.js"
import {addToCart} from "../helperFunctions/cart.js";


window.onload = function() {
    loadProducts();
    addEventListeners()
    renderFooter();
    renderHeader();
};

var productsList;

function loadProducts() {
    fetch("../ShopifyProducts.json")
        .then(response => response.json())
        .then(jsonData => {
            productsList = jsonData
            renderAllCategories(jsonData)
        });
}

function renderAllCategories(jsonData) {
    let filterByOffer = filterProducts(jsonData, 
        {"offer": true}).slice(0,3);
    let filterByArrival = filterProducts(jsonData, 
        {"arrival": true}).slice(0,3);
    let filterByDelivery = filterProducts(jsonData, 
        {"delivery": true}).slice(0,3);
        render(filterByOffer, 'offerProducts');
        render(filterByArrival, 'arrivalProducts');
    render(filterByDelivery, 'deliveryProducts');
}


function addEventListeners() {
    //
}

function renderFooter(){
    document.getElementById("footer").innerHTML = createFooter();
}

function renderHeader(){
    document.getElementById("navbar").innerHTML = createHeader();
}

//Defining global function
window.handleAddToCart = handleAddToCart;

function handleAddToCart(id){
    let newProduct = filterProducts(productsList, { id: id })[0];
    addToCart(newProduct);
}

function render(data, elementId) {
    data.forEach(element => {
        let newCard = document.createElement('div');
        newCard.classList.add('col-sm-12')
        newCard.classList.add('col-lg-4')
        newCard.innerHTML = 
            `<div class="card mb-4">
                <div><img src="`+ element.image +`" class="card-img-top p-4 card__image" alt="`+ element.title +`"></div>
                <div class="card-body">
                    <h5 class="card-title card__body__title">`+ element.title +`</h5>
                    <p class="card-text card__body__type">`+ element.type +`. Breed: `+ element.breed +`</p>
                    <p class="card-text card__body__type">Pet size: `+ element.size + `</p>
                    <p class="card-text card__body__type fs-5 fw-bolder">`+ element.price +` €</p>
                    <div class="d-flex justify-content-between card__body__button-cont">
                        <a href="../productDetails/productDetails.html?id=` + element.id + `"class="btn btn-primary">Details</a>
                        <button id="` + element.id + `" onClick="handleAddToCart(` + element.id + `)" value=` + element.id + ` class="btn btn-success align-self-end">Add to Cart</button>
                    </div>
                </div>
            </div>`
        document.getElementById(elementId).appendChild(newCard)
    });
}
