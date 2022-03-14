import {createFooter} from "../components/footer.js"
import {createHeader} from "../components/header.js"
import { deleteProduct } from "../helperFunctions/cart.js";
import {clearCart} from "/helperFunctions/cart.js"
import {filterProducts} from "/helperFunctions/filter.js"

window.onload = function() {
    displayHeader()
    loadProduct();
    addEventListeners()
    displayFooter()
    handleTotal()
    handleCartSize()
};

var productsList;

window.handleDeleteProduct = handleDeleteProduct;

function displayHeader() {
  document.getElementById("navbar").innerHTML = createHeader();
}
function displayFooter() {
    document.getElementById("footer").innerHTML = createFooter()
}

export function handleTotal() {
    const total = displayTotal(productsList)
    document.getElementById("productTotal").innerHTML = total
}

export function handleCartSize() {
    let numberOfItems = localStorage.getItem("cart size")
    if (!numberOfItems) numberOfItems = 0
    document.getElementById("numCartItems").innerHTML = "Cart (" + numberOfItems + ")"
    console.log(numberOfItems)
}

function displayTotal(productsList) {
    if (!productsList) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "eur",
            minimumFractionDigits: 0,
          }).format(0)
    }

    const total = productsList.reduce(function (acc, next) {
      return acc + (next.price*next.amount)
    }, 0)
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "eur",
        minimumFractionDigits: 0,
      }).format(total)
  }

function loadProduct() {
    var MyDataString = localStorage.getItem("product-array")
    var data = JSON.parse(MyDataString)
    if (data && data.length > 0) {
        render(data)
    } else {
        render()
    }
    productsList = data
}

function handleClearCart() {
    clearCart()
    loadProduct()
    handleTotal()
    handleCartSize()
}

function handleDeleteProduct(id){
    let product = productsList.filter(el => el.id == id)
    let objectProduct = product[0]
    const newProductList = deleteProduct(objectProduct)
    loadProduct()
    handleTotal()
    handleCartSize()
}

function addEventListeners() {
  document
    .getElementById("clearCartButton")
    .addEventListener("click", function () {
      handleClearCart();
    });
}

function render(data) {
  document.getElementById("cartList").innerHTML = "";
  if (data) {
    data.forEach((element) => {
      var newProduct = document.createElement("div");
      newProduct.classList.add("col-sm-4-auto");
      // is a node
      newProduct.innerHTML =
        `<li class="row">
            <div class="col-lg-3 product-img-layout">
                <img class= "product_img" src="` +
        element.image +
        `" alt="">
            </div>
            <div class="col product-text-container">
                <div class="row">
                    <div class="col">
                        <p>` +
        element.title +
        `</p>
                    </div>
                    <div class="col product-price-container">
                        <p class= "product-text-price">`+ (element.price*element.amount) +`</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="product-text-subtext">` +
        element.description +
        `</p>
                    </div>
                    <div class="col product-price-container">
                        <button id="deleteButton" onClick="handleDeleteProduct(` +
                        element.id +
                        `)" type="button" class="btn btn-outline-danger">Delete product</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p> Quantity: `+ element.amount +`</p>
                    </div>
                </div>
            </div>
        </li>`;
      document.getElementById("cartList").appendChild(newProduct);
    });
  } else {
    var newProduct = document.createElement("div");
    newProduct.classList.add("col-sm-4.auto");
    newProduct.innerHTML =
      '<p class="text-center" style="padding-top: 24px;">Your cart is empty</p>';
    document.getElementById("cartList").appendChild(newProduct);
  }
}

function title() {
  if (localStorage.firstName != null) {
    document.getElementById("title").innerHTML =
      localStorage.getItem("firstName") + "'s Shopping Cart";
  } else {
    document.getElementById("title").innerHTML = "My Shopping Cart";
  }
}
