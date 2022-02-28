window.onload = function() {
    loadProducts();
    addEventListeners()
};
var data;
function loadProducts() {
    fetch("../ShopifyProducts.json")
        .then(response => response.json())
        .then(json => render(json));
}


function addEventListeners() {
    //
}



function render(data) {
    data.forEach(element => {
        var newCard = document.createElement('div');
        newCard.classList.add('col')
         // is a node
        newCard.innerHTML = `<div class="card">
                <img src="`+ element.image +`" class="card-img-top img-fluid"  style="max-height: 300px" alt="...">
                <div class="card-body">
                    <h5 class="card-title">`+ element.title +`</h5>
                    <p class="card-text">`+ element.type +`</p>
                    <a href="#" class="btn btn-primary">See details</a>
                </div>
            </div>`
        document.getElementById("allProducts").appendChild(newCard)
    });
}