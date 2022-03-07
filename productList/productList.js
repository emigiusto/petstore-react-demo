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

    /* Updates list of products with a certain filter by rendering Bootstraps cards for each of them
    filterObject has the form of: {key1: value1, key2: value2, ..} Example:
        {
            "breed" : "giant",
            "sterilized": true
        }
    */
    function loadProducts(filterObject) {
        //Fetch dba
        productsList = fetch("../../ShopifyProducts.json")
            .then(response => response.json())
            .then(data => {
                render(filterProducts(data, filterObject)); //Renders the list of products filtered by the filterObject received
                productsList = data; //Saves list of product in global variable
            });
    }

    /* Updates the filter menu with the current filters defined by the user. Only works for filters with multiple options (dropdowns)
    filterObject has the form of: {key1: value1, key2: value2, ..} Example:
    The name of filters should match the id of the container element of the
        {
            "breed" : "giant",
            "type": "dog"
        }
    */
    function loadFilters(filterObject) {
        filtersList = filterObject; //Updates global variable
        Object.keys(filtersList).forEach((key, index) => {
            if (typeof filtersList[key]=="string") {
                document.getElementById(key).innerHTML = capitalizeFirstLetter(filtersList[key]);
            }
        });
    }

    //Updates the state of filters that have active/non-active behaviour. 
    // For example if the html element active property is set to true AddFilter() is called, otherwise removeFilter() is called 
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

// ----------------------------------------------------------//
//RENDERING FUNCTIONS
    //Renders the list of products received in the array filteredData by generating a Bootstrap card for each product
    //Inserts the list in the container with id = "products"
    //filteredData is an array of type [{Product1},{Product2},{Product3}]
    function render(filteredData) {
        document.getElementById("products").innerHTML = ""
        filteredData.forEach(element => {
            let newCard = document.createElement('div');
            newCard.classList.add('col-sm-4')
            newCard.classList.add('col-lg-3')
            newCard.innerHTML = 
                `<div class="card mb-4">
                    <div><img src="`+ element.image +`" class="card-img-top p-4 card__image" alt="`+ element.title +`"></div>
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

    //Adds a new filter with the parameters received. For example: filterType= "breed" and value="giant"
    //Re-renders all displayed products and filters
    function addFilter (filterType, value) {
        let newFilterObject = {...filtersList}
        newFilterObject[filterType] = value;
        //Refresh product Lists and filters menu
        loadProducts(newFilterObject);
        loadFilters(newFilterObject);
    }

    //Removes a new filter with the parameters received. For example: filter = "breed"
    //Re-renders all displayed products and filters
    function removeFilter (filter) {
        let newFilterObject = {...filtersList}
        delete newFilterObject[filter];
        //Refresh product Lists and filters menu
        loadProducts(newFilterObject);
        loadFilters(newFilterObject);
    }

//Handles the event bound to addToCart button.
//Receives and id, filters the list of products by that id and calls addToCart with the new product
function handleAddToCart(id) {
    let newProduct = filterProducts(productsList, { id: id })[0]
    addToCart(newProduct);
}