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
                <div><img src="`+ element.image +`" class="card-img-top p-4" width=100 height=100 alt="..."></div>
                <div class="card-body">
                    <h5 class="card-title">`+ element.title +`</h5>
                    <p class="card-text">`+ element.type +`</p>
                    <a href="/productDetail/productDetail.html?`+ "id=" + element.id +`" class="btn btn-primary">See details</a>
                </div>
            </div>`
        document.getElementById("offerProducts").appendChild(newCard)
    });
}