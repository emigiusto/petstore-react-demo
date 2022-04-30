import { createFooter } from "../components/footer.js";
import { createHeader } from "../components/header.js";
import { addToCart } from "../helperFunctions/cart-helper.js";
import { filterProducts } from "../helperFunctions/filter.js";

window.onload = function () {
  loadProduct();
  addEventListeners();
  renderHeader();
  renderFooter();
};

window.handleAddToCart = handleAddToCart;

let product;

function loadProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  // get selected product id from url
  let id = urlParams.get("id");

  // fetch all products
  fetch("../ShopifyProducts.json")
    .then((response) => response.json())
    .then((data) => {
      // find selected product among those
      product = filterProduct(data, id);
      // render selected product
      render(product);
    });
}

function renderFooter() {
  document.getElementById("footer").innerHTML = createFooter();
}

function renderHeader() {
  document.getElementById("navbar").innerHTML = createHeader();
}

function addEventListeners() {
  //
}

function filterProduct(data, id) {
  var productInList = data.find(function (item) {
    if (id == item.id) {
      return item;
    }
    return null;
  });

  return productInList;
}

function render(selectedProduct) {
  var newProduct = document.createElement("div");
  newProduct.innerHTML =
    `<div class="row p-5 mx-5">
        <div class="col-sm">
          <div class="col px-2 pb-2"><h3>` +
    selectedProduct.title +
    `</h3></div>
          <div class="col px-2 pb-2">` + 
    selectedProduct.description +
    `</div>
          <div class="col px-2 pb-2"><h3>` +'€' +
    selectedProduct.price +
    ` </h3></div>
          <div class="col px-2 pb-2"><button onClick="handleAddToCart()" type="button" class="btn btn-dark">Add to cart</button></div>
        </div>
        <div class="col-sm">
          <div class="col-sm-12 d-flex justify-content-center">
              <img src="` +
    selectedProduct.image +
    `" alt="">
          </div>
        </div>
      </div>`;
  document.getElementById("product").appendChild(newProduct);
}

function handleAddToCart() {
  addToCart(product);
}
