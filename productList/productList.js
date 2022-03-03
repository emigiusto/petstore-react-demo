window.onload = function() {
    loadProducts();
};
var data;
function loadProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterObject = paramsToObject(urlParams.entries());

    fetch("../../ShopifyProducts.json")
        .then(response => response.json())
        .then(data => render(filterProducts(data, filterObject)));
}


function filterProducts (data, queryparams) {
    return data.filter((function (item){
        //Iterating through all queryparam keys
        for(const [key, value] of Object.entries(queryparams)) { 
            if(item[key].toLowerCase().trim().replace(/\s/g, '') != value) return false;
        }
        return true
    }))
}



function render(data) {
    data.forEach(element => {
        var newCard = document.createElement('container-fluid');
        newCard.classList.add('col-sm-4')
         // is a node
        newCard.innerHTML = `<div class="card">
                <div><img src="`+ element.image +`" class="card-img-top p-4" width=500 height=500 alt="..."></div>
                <div class="card-body">
                    <h5 class="card-title">`+ element.title +`</h5>
                    <p class="card-text">`+ element.type +`</p>
                    <a href="#" class="btn btn-primary">See details</a>
                </div>
            </div>`
        document.getElementById("products").appendChild(newCard)
    });
}

function paramsToObject(entries) {
    const result = {}
    for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value.toLowerCase().trim().replace(/\s/g, '');
    }
    return result;
}