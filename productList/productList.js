window.onload = function() {
    loadProducts();
};
//Global variable of products fetched from the database
var productsList;

function loadProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterObject = paramsToObject(urlParams.entries());
    updateDescription(urlParams.values());
    //Fetch dba
    productsList = fetch("../../ShopifyProducts.json")
        .then(response => response.json())
        .then(data => {
            render(filterProducts(data, filterObject));
            productsList = data;
        });
}

// ----------------------------------------------------------//
//CART HANDLE FUNCTIONS
    //Add to cart function. Will never run before products are loaded "loadProducts()", 
    //so it's safe from the asynchronous perspective ;)
    function addToCart(id) {
        let newProduct = filterProducts(productsList,{id: id})[0]
        let currentProductList = JSON.parse(localStorage.getItem("product-array"));
        if (currentProductList) { //1) Cart is not empty
            var found = currentProductList.find(element => element.id == id)
            if (found) { //1) a) Product is already on the cart --- Add one unit!
                currentProductList = currentProductList.filter(product => product.id != id)
                let updatedProduct = {amount: found.amount+1 ,...newProduct}
                currentProductList.push(updatedProduct)
                //console.log("Product with id " + id + " has been added. The product was already on the cart, +1 amount updated")
                
            } else { //1) b) Product is NOT on the cart --- Add product
                currentProductList.push({amount: 1, ...newProduct})
                //console.log("Product with id " + id + " has been added. Cart didn't have the product")
            }
        } else { //2) Cart is empty
            currentProductList = []
            currentProductList.push({amount: 1, ...newProduct})
            //console.log("Product with id " + id + " has been added. Cart was empty")
        }
        localStorage.setItem("product-array", JSON.stringify(currentProductList));
        toast("Product added to cart")
        console.log("Updated Cart:")
        console.log(currentProductList)
    }

    //Clears the cart in local storage - NOT BEING USED - Only for testing in the console
    function clearCart() {
        localStorage.removeItem("product-array");
    }

// ----------------------------------------------------------//
//RENDERING FUNCTIONS
    //Renders the list of products already filtered. Generates cards
    function render(filteredData) {
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
                        <p class="card-text card__body__type">`+ element.type +`</p>
                        <div class="d-flex justify-content-between card__body__button-cont">
                            <a href="../productDetails/productDetails.html?id=` + element.id + `"class="btn btn-primary">Details</a>
                            <button id="addToCart" onClick="addToCart(` + element.id + `)" value=` + element.id + ` class="btn btn-success align-self-end">Add to Cart</button>
                        </div>
                    </div>
                </div>`
            document.getElementById("products").appendChild(newCard)
        });
    }
    //Update title and helper function
    function updateDescription(filterObject) {
        console.log(!filterObject)
        let title = ""
        if (!filterObject) {
            title = title + "Filtered by: " + filterNameConverter(filterObject.next().value);

            let counter = filterObject.next()
            while (!counter.done) {
                title =+ ", " + filterNameConverter(counter.value)
                counter = filterObject.next();
            }
        }
        document.getElementById("description").innerHTML = title;
    }
    //Render a Bootstrap toast
    function toast(message) {
        var alertPlaceholder = document.body
        var wrapper = document.createElement('html')
        wrapper.innerHTML = '<div class="toast align-items-center text-white bg-success border-0 show alert-message-box" role="alert" aria-live="assertive" aria-atomic="true">'
                            + '<div class="d-flex">'
                            + '<div class="toast-body">'
                            + message
                            + '</div>'
                            + '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>'
                            + '</div></div>'
        alertPlaceholder.append(wrapper)
        //Deletes Alert Message after 3 secs
        setTimeout(function (){
            wrapper.innerHTML= "";
        }, 3000);
    }
// ----------------------------------------------------------//
//HELPER FUNCTIONS
    //Converts entries of type [ [key, value], ...] to {key1: value1, key2: value2...}
    function paramsToObject(entries) {
        const result = {}
        for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
            result[key] = value.toLowerCase().trim().replace(/\s/g, '');
        }
        return result;
    }
    //Converts strings from the query params to display on DOM
    function filterNameConverter(paramNameOfFilter) {
        let correctName;
        switch (paramNameOfFilter) {
            case "dogfood":
                correctName = "Dog Food"
                break;
            case "catfood":
                correctName = "Cat Food"
                break;
            case "cannedcatfood":
                    correctName = "Canned Cat Food"
                    break;
            default:
                correctName = paramNameOfFilter ? paramNameOfFilter.toUpperCase() : ""
                break;
        }
        return correctName
    }

    //Filter dataset by any {key: value} passed in queryparams
    function filterProducts (data, queryparams) {
        return data.filter((function (item){
            //Iterating through all queryparam keys
            for(const [key, value] of Object.entries(queryparams)) { 
                if (typeof item[key]=="string") {
                    if(item[key].toLowerCase().trim().replace(/\s/g, '') != value) return false;
                } else {
                    if(item[key] != value) return false;
                }
                
            }
            return true
        }))
    }