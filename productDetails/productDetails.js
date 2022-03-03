window.onload = function() {
    loadProduct();
    addEventListeners()
};
var data;
function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id")
    fetch("../../ShopifyProducts.json")
        .then(response => response.json())
        .then(data => render(filterProduct(data, id)));
}


function addEventListeners() {
    //
}

function filterProduct(data, id) {
    
    var dataFiltered = data.filter((function (item){
    
        if (id == item.id) {
            return true;
        }
        return false;
    }))
    
    return dataFiltered
}

function render(data) {
    data.forEach(element => {
        var newProduct = document.createElement('div');
        newProduct.innerHTML = `<div>
                <div><img src="`+ element.image +`" class="card-img-top p-4" alt="..."></div>
                <div>
                    <h5>`+ element.title +`</h5>
                    <p>`+ element.type +`</p>
                    <a href="#" class="btn btn-primary">See details</a>
                </div>
            </div>`
        console.log(data);
        document.getElementById("product").appendChild(newProduct)
    });
}