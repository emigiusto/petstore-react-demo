window.onload = function() {
    loadProducts();
    addEventListeners()
};
var data;
function loadProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    let type = urlParams.get("type") ? urlParams.get("type").toLowerCase().trim().replace(/\s/g, '') : ""
    let breed = urlParams.get("breed")? urlParams.get("breed").toLowerCase().trim().replace(/\s/g, '') : ""
    console.log(type)
    let filterObject = {
        type: type,
        breed: breed
    }
    fetch("../../ShopifyProducts.json")
        .then(response => response.json())
        .then(data => render(filterProducts(data, filterObject)));
}


function addEventListeners() {
    //
}


function filterProducts (data, queryparams) {
    console.log(data.length)
    /*
    if (queryparams.keys().length = 0) {
        return data
    }
    */
    var dataFiltered = data.filter((function (item){
        let itemtype = item.type ? item.type.toLowerCase().trim().replace(/\s/g, '') : ""
        //let itembreed = urlParams.get("breed")? urlParams.get("breed").toLowerCase().trim().replace(/\s/g, '') : ""
        if (queryparams.type && queryparams.type != itemtype) {
            return false;
        }
        return true
    }))
    
    return dataFiltered
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