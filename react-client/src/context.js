import React, { Component } from "react";

const ProductContext = React.createContext();
//Context has 2 components
//Provider
//Consumer

class ProductProvider extends Component {
    state = {
        products: [],
        cart: [],
        cartSize: 0,
        cartId: null,
        cartTotal: 0,
        userId: null, //If userId is not null, means that the user is Logged in
        productInDetail: null,
        filters: [],
        activeFilters: [],
    };

    componentDidMount = async () => {
        this.getSessionInfo();
        this.setProducts();
        this.setCart();
        this.setFilters();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.cart !== this.state.cart) {
            this.setCartTotal()
        }
    }

    //Method to get userId (and more info?) from localStorage when app starts
    getSessionInfo = () => {
        let userIdStored = localStorage.getItem("userid");
        this.setState(() => {
            return { userId: userIdStored };
        });
    };

    setProductDetail = (productToAssign) => {
        let product = this.state.products.find(
            (product) => product.id === productToAssign.id
        );
        this.setState(() => {
            return { productInDetail: product };
        });
    };

    //Method to copy original values and set them on state (products property)
    setProducts = async () => {
        const storeProducts = await fetch("http://localhost:3005/products");
        const data = await storeProducts.json();
        this.setState(() => {
            return { products: [...data.products] };
        });
    };

    //Method to Fetch the cart
    setCart = async () => {
        if (this.state.userId) {
            const cart = await fetch(
                "http://localhost:3005/orders/basket/" + this.state.userId
            );
            const data = await cart.json();
            this.setState(() => {
                return {
                    cart: data.items,
                    cartId: data.id,
                };
            });
        }
    };

    //Method to set the filters available in Firestore
    setFilters = async () => {
        const storeProducts = await fetch("http://localhost:3005/categories");
        const data = await storeProducts.json();
        this.setState(() => {
            return { filters: [...data] };
        });
    };

  getProduct = (id, quantity) => {
        return {
          ...this.state.products.find((product) => product.id === id),
          quantity: quantity,
        };
      }

    getSum = (total, productInCart) => {
        return total + productInCart.price*productInCart.quantity;
    }

    getCartSize = (total, productInCart) => {
        return total + productInCart.quantity;
    }

    setCartTotal = () => {
        let fullCart = this.state.cart.map(cartItem => this.getProduct(cartItem.productid,cartItem.quantity))
        let cartSize = fullCart.reduce((this.getCartSize), 0)
        let total = fullCart.reduce((this.getSum), 0)
        this.setState(() => {return {cartTotal:total.toFixed(2)}})
        this.setState(() => {return {cartSize:cartSize}})
    }
    

    //Method to update the cart
    addToCart = async (productId) => {
        if (this.state.userId) {
            await put(
                "http://localhost:3005/orders/increaseproduct/" + this.state.cartId,
                { productId: productId }
            );
            this.setCart();
            console.log(
                "Product with id " +
                productId +
                " was added to the cart with id: " +
                this.state.cartId
            );
        } else {
            var data = await fetch("http://localhost:3005/products/" + productId);
            if (data.status === 200) {
                this.localCartOperation(productId, "increase");
            } else {
                console.log("Product with id " + productId + " does not exist");
            }
        }
    };

    getActiveFilter = (filterToSearch) => {
        let filterFound = this.state.activeFilters.find(filter => filter.filter === filterToSearch)
        return filterFound ? filterFound : false
    }

    //Method to update current filters and reset product
    updateActiveFilters = (newFilter, option) => {
        let filterFound = this.getActiveFilter(newFilter)
        if (filterFound) {
            let filteredFilters = this.state.activeFilters.filter((filter) => filter.filter !== newFilter)
            if (option === "All" || option ===false) {
                this.setState(() => {
                    return { activeFilters: [...filteredFilters] }
                })
            } else {
                this.setState(() => {
                    return { activeFilters: [...filteredFilters, { filter: newFilter, option: option }] }
                })
            }
        } else if (option !== "All") {
            this.setState(() => {
                return { activeFilters: [...this.state.activeFilters, { filter: newFilter, option: option }] }
            })
        }
    }

    //Method to update current filters and reset product
    clearActiveFilters = () => {
        this.setState(() => {
            return { activeFilters: [] }
        })
    }

    //Method to update the cart
    decreaseFromCart = async (productId) => {
        if (this.state.userId) {
            await put(
                "http://localhost:3005/orders/decreaseproduct/" + this.state.cartId,
                { productId: productId }
            );
            this.setCart();
        } else {
            //Operate in local cart
            var data = await fetch("http://localhost:3005/products/" + productId);
            if (data.status === 200) {
                this.localCartOperation(productId, "decrease");
            } else {
                console.log("Product with id " + productId + " does not exists");
            }
        }
    };

    //Method to update the cart
    removeProduct = async (productId) => {
        if (this.state.userId) {
            await put(
                "http://localhost:3005/orders/removeproduct/" + this.state.cartId,
                { productId: productId }
            );
            this.setCart();
        } else {
            //Operate in local cart
            var data = await fetch("http://localhost:3005/products/" + productId);
            if (data.status === 200) {
                this.localCartOperation(productId, "removeproduct");
            } else {
                console.log("Product with id " + productId + " does not exists");
            }
        }
    };

    //Method to update the cart in the API  ---> Called on Login
    updateCart = async (user) => {
        const cart = await fetch("http://localhost:3005/orders/basket/" + user.id);
        const data = await cart.json();
        if (data) {
            //User has a cart open in the API
            await put("http://localhost:3005/orders/" + data.id, {
                items: [...this.state.cart],
            });
            console.log("Cart with id " + data.id + " updated in API");
            this.setState(() => {
                return { cartId: data.id }; //Updates cartId in state
            });
        } /* else {     -------------------NOT NECESSARY, our API handles this case by creating one if there isn't one
            let newOrderBody = {
                    address: "",
                    items: [...this.state.cart],
                    userid: user.id
            }
            await post("http://localhost:3005/orders/",newOrderBody)
            console.log("New cart created for user with id: " + user.id) 
        }   */
    };

    clearCart = async () => {
        if (this.state.userId) {
            await put(
                "http://localhost:3005/orders/clearbasket/" + this.state.userId
            );
            this.setCart();
        } else {
            this.setState(() => {
                return { cart: [] };
            });
        }
    };

    //Performs operation in local state cart
    localCartOperation(productId, action) {
        let filteredCart = this.state.cart.filter(
            (product) => product.productid !== productId
        );
        let product = this.state.cart.find(
            (product) => product.productid === productId
        );
        if (action === "increase") {
            if (product) {
                /* Product is in cart  */
                let prevQuantity = product.quantity;
                console.log(
                    "Product with id " + productId + " was increased in the offline cart"
                );
                this.setState(() => {
                    return {
                        cart: [
                            ...filteredCart,
                            { productid: productId, quantity: prevQuantity + 1 },
                        ],
                    };
                });
            } else {
                /* Product is not in cart  */
                this.setState(() => {
                    return {
                        cart: [...this.state.cart, { productid: productId, quantity: 1 }],
                    };
                });
                console.log(
                    "Product with id " + productId + " was added in the offline cart"
                );
            }
        } else if (action === "decrease") {
            if (product) {
                /* Product is in cart  */
                let prevQuantity = product.quantity;
                if (prevQuantity > 1) {
                    console.log(
                        "Product with id " +
                        productId +
                        " was decreased in the offline cart"
                    );
                    this.setState(() => {
                        return {
                            cart: [
                                ...filteredCart,
                                { productid: productId, quantity: prevQuantity - 1 },
                            ],
                        };
                    });
                } else {
                    //Quantity is 1, product should be deleted
                    console.log(
                        "Product with id " +
                        productId +
                        " was removed from the offline cart"
                    );
                    this.setState(() => {
                        return { cart: [...filteredCart] };
                    });
                }
            } else {
                /* Product is not in cart  */
                console.log("Product with id " + productId + " is not in the cart");
            }
        } else if (action === "removeproduct") {
            console.log(
                "Product with id " + productId + " was removed from the offline cart"
            );
            this.setState(() => {
                return { cart: [...filteredCart] };
            });
        }
    }

    userExists = async (email) => {
        const users = await fetch("http://localhost:3005/users");
        const data = await users.json();
        const user = data.users.find((user) => user.email === email);
        return user ? true : false;
    };

    //Function to add a new user
    registerUser = async (newUser) => {
        if (!(await this.userExists(newUser.email))) {
            console.log(newUser);
            post("http://localhost:3005/users/", newUser);
            return true;
        } else {
            return false;
        }
    };

    //Attempts to log in user
    //Logic behind login and offline carts: If the user has a local cart with at least 1 item,
    // Then it replace the content of the cart in the API (Cart meaning order "in progress")
    // If there are no items on the local cart ,login retrieves the cart content of the API
    signin = async (email, password) => {
        const users = await fetch("http://localhost:3005/users");
        const data = await users.json();
        const user = data.users.find((user) => user.email === email);
        if (user) {
            //User exists
            if (user.password === password) {
                //Logged in!
                this.setState(() => {
                    return { userId: user.id }; //Updates app state
                });
                localStorage.setItem("userid", user.id); //Updates localStorage for future sessions
                if (this.state.cart.length > 0) {
                    //If offline cart has items, set them as the valid list in the API
                    this.updateCart(user);
                } else {
                    //Otherwise, retrieve user's existing cart in the API
                    this.setCart();
                }
                //Retrieves user's Cart
                console.log("Logged in successfully");
            } else {
                console.log("Password is incorrect");
                return false;
            }
        } else {
            console.log("User with email: " + email + " doesn't exist");
            return false;
        }
    };

    signout = () => {
        localStorage.removeItem("userid"); //Updates localStorage for future session
        console.log("Signed out successfully");
        this.setState(() => {
            return { userId: null }; //Updates app state
        });
        this.setState(() => {
            return { cart: [] };
        });
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, //deconstruction of state
                addToCart: this.addToCart,
                decreaseFromCart: this.decreaseFromCart,
                removeProduct: this.removeProduct,
                clearCart: this.clearCart,
                signin: this.signin,
                signout: this.signout,
                setProductDetail: this.setProductDetail,
                userExists: this.userExists,
                setCartTotal: this.setCartTotal
                updateActiveFilters: this.updateActiveFilters,
                getActiveFilter: this.getActiveFilter,
                clearActiveFilters: this.clearActiveFilters
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };

//Helper Fetch functions
var post = function (url, data) {
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
};
var put = function (url, data) {
    return fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
};
