export function createHeader() {
  return (`
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
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
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Cat Food
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a
                    class="dropdown-item"
                    href="/productList/productList.html?breed=giant"
                  >
                    Giant
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="/productList/productList.html?breed=large"
                  >
                    Large
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="/productList/productList.html?breed=medium"
                  >
                    Medium
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="/productList/productList.html?breed=small"
                  >
                    Small
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dog Food
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Bird Food
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">
                Cart (`+ cart() +`)
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`
  );
}

function cart() {
  var cartsize;
  if (localStorage.getItem("cart size") == null) {
    cartsize = "0"
  } else {
    cartsize = localStorage.getItem("cart size")
  }
  return cartsize;
}


