import {createFooter} from "../components/footer.js"
import {createHeader} from "../components/header.js"

window.onload = function() {
    loadProduct();
    addEventListeners()
    renderHeader();
    renderFooter();
};
var data;
function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id")
    fetch("../../ShopifyProducts.json")
        .then(response => response.json())
        .then(data => render(filterProduct(data, id)));
}

function renderFooter(){
    document.getElementById("footer").innerHTML = createFooter();
}

function renderHeader(){
    document.getElementById("navbar").innerHTML = createHeader();
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
        newProduct.innerHTML = `<div class="row p-5 mx-5">
        <div class="col-sm">
          <div class="col px-2 pb-2"><h3>`+ element.title +`</h3></div>
          <div class="col px-2 pb-2">`+ element.description +`</div>
          <div class="col px-2 pb-2"><h3>`+ element.price +` EURO</h3></div>
          <div class="col px-2 pb-2"><button type="button" class="btn btn-dark">Add to cart</button></div>
        </div>
        <div class="col-sm">
          <div class="col-sm-12 d-flex justify-content-center">
              <img src="`+ element.image +`" alt="">
          </div>
        </div>
      </div>`

        console.log(data);
        document.getElementById("product").appendChild(newProduct)
    });
}