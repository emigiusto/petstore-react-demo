
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

function render(data) {
    data.forEach(element => { 
        var newProduct = document.createElement('div');
        newproduct.classList.add('col-sm-4')
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
        document.getElementById("cartList").appendChild(newproduct)
    });
}