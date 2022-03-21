export function createHeader() {
  return (
    `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="../index/index.html">
          Pet Store
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
            <a
            class="dropdown-item"
            href="/productList/productList.html"
          >
            Products
          </a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a id="numCartItems" class="nav-link" aria-current="page" href="/cart/cart.html">
                Cart (`+ cart() +`)
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/login/login.html">
                
          `+
  name() +
  `
      
              </a>
            </li>
          </ul>
        </div>
      </div>       
    </nav>

    
     
    
    
    
    
    `
  );
}
function cart() {
  var cartsize;
  if (localStorage.getItem("cart size") == null) {
    cartsize = "0"
  } else if (localStorage.getItem("cart size") < 0) {
    cartsize = "0"
  } else {
    cartsize = localStorage.getItem("cart size");
  }
  return cartsize;
}

function name() {
  if (localStorage.firstName != null) {
    let greeting = (localStorage.getItem("firstName"));
    return greeting;
  }
  return "Login";
}
