import {capitalizeFirstLetter} from "../helperFunctions/text.js";
import {paramsToObject} from "../helperFunctions/helper.js";
import {filterProducts} from "../helperFunctions/filter.js";
import {clearCart,addToCart} from "../helperFunctions/cart.js";

window.onload = function() {
    init();
};
//Global variable of products fetched from the database
var productsList;
var filtersList;

//Change scope of functions to global
window.addFilter = addFilter;
window.toggleFilters = toggleFilters;
window.clearCart = clearCart;
window.handleAddToCart = handleAddToCart;

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterObject = paramsToObject(urlParams.entries());
    loadProducts(filterObject);
    loadFilters(filterObject);
}

    //Render functions: 
    function loadProducts(filterObject) {
        //Fetch dba
        productsList = fetch("../../ShopifyProducts.json")
            .then(response => response.json())
            .then(data => {
                render(filterProducts(data, filterObject));
                productsList = data;
            });
    }

    function loadFilters(newfilterObject) {
        filtersList = newfilterObject;
        Object.keys(filtersList).forEach((key, index) => {
            if (typeof filtersList[key]=="string") {
                document.getElementById(key).innerHTML = capitalizeFirstLetter(filtersList[key]);
            }
        });
    }

// ----------------------------------------------------------//
//RENDERING FUNCTIONS
    //Renders the list of products already filtered. Generates cards
    function render(filteredData) {
        document.getElementById("products").innerHTML = ""
        filteredData.forEach(element => {
            var newCard = document.createElement('div');
            newCard.classList.add('col-sm-4')
            newCard.classList.add('col-lg-3')
            // is a node
            newCard.innerHTML = 
                `<div class="card mb-4">
                    <div><img src="`+ element.image +`" class="card-img-top p-4 card__image" width=500 height=500 alt="..."></div>
                    <div class="card-body">
                        <h5 class="card-title card__body__title">`+ element.title +`</h5>
                        <p class="card-text card__body__type">`+ element.type +`. Breed: `+ element.breed +`</p>
                        <p class="card-text card__body__type">Pet size: `+ element.size + `</p>
                        <p class="card-text card__body__type fs-5 fw-bolder">`+ element.price +` eu</p>
                        <div class="d-flex justify-content-between card__body__button-cont">
                            <a href="../productDetails/productDetails.html?id=` + element.id + `"class="btn btn-primary">Details</a>
                            <button id="` + element.id + `" onClick="handleAddToCart(` + element.id + `)" value=` + element.id + ` class="btn btn-success align-self-end">Add to Cart</button>
                        </div>
                    </div>
                </div>`
            document.getElementById("products").appendChild(newCard)
        });
    }

    //Filter menu handler
    function addFilter (filterType, value) {
        var newFilterObject = {...filtersList}
        newFilterObject[filterType] = value;
        //Refresh objects and filters
        loadProducts(newFilterObject);
        loadFilters(newFilterObject);
    }

    //Filter menu handler
    function removeFilter (filter) {
        var newFilterObject = {...filtersList}
        delete newFilterObject[filter];
        //Refresh objects and filters
        loadProducts(newFilterObject);
        loadFilters(newFilterObject);
    }

    //Toggle Filter buttons
    function toggleFilters(that) {
        if (that.getAttribute("active")) { //Remove filter
            that.removeAttribute("active");
            that.classList.add("btn-outline-secondary");
            that.classList.remove("btn-secondary");
            removeFilter(that.id);
        } else { //Add filter
            that.setAttribute("active", true); 
            that.classList.remove("btn-outline-secondary");
            that.classList.add("btn-secondary");
            addFilter(that.id,true);
        }
    }

//Events handlers
function handleAddToCart(id) {
    let newProduct = filterProducts(productsList, { id: id })[0]
    addToCart(id,newProduct);
}



//CART HANDLING FUNCTIONS
