import {toast} from "../helperFunctions/toast.js";
import {createFooter} from "../components/footer.js"
import {createHeader} from "../components/header.js"

window.onload = function() {
    initLogin();
    addEventListeners();
    check_signIn();
    renderHeader();
    renderFooter();
};

function renderFooter(){
    document.getElementById("footer").innerHTML = createFooter();
}

function renderHeader(){
    document.getElementById("navbar").innerHTML = createHeader();
}

function initLogin() {
    //Initialize LocalStorage - Hardcoded email and user
    localStorage.setItem('email', 'test@itu.dk');
    localStorage.setItem('password', '123456');
}

//Change scope of functions to global
window.handleCheckbox = handleCheckbox;

function addEventListeners() {
    //Login Form Submit
    document.getElementById("loginForm").addEventListener('submit', handleForm);
}

//Events Callbacks
    //Login Form Handler. 
    //Extracts all input fields data and if checkUserPassword return status = true, and stores user's data into localStorage
    function handleForm(event) { 
        event.preventDefault(); 
        const data = new FormData(event.target);
        let login = checkUserPassword(data.get("email"),data.get("password"))
        if (login.status) { //Success!
            //Hide Login
            document.getElementById("loginForm").classList.add("hidden")
            //Stores user data
            localStorage.setItem('userEmail',data.get("email"));
            localStorage.setItem('userPassword', data.get("password"));
            localStorage.setItem('userRemember', data.get("remember"));
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('loginTimeStamp', Date.now());
            //Reset form
            document.getElementById("loginForm").reset();
            //Change State on nav bar from NotLoggedIn to LoggedIn
            //... awaiting design details to implement
        }
        let type = login.status ? 'success' : 'danger';
        toast(login.message,type,3000)
    } 

    //Updates value of checkbox in every click
    function handleCheckbox(cb) {
        cb.value = cb.checked;
    }

//Auxiliar functions
//Check if the user and password entered are correct and returns an object with message and status.
function checkUserPassword(user,password) {
    if (user !== localStorage.getItem("email")) {
        return {message: "The email does not correspond to an existing account", status: false}
    }
    if (password !== localStorage.getItem("password")) {
        return {message: "The password is incorrect", status: false}
    }
    return {message: "Login successful into PetStore", status: true}
}


function check_signIn(){
    if(!window.localStorage.hasOwnProperty("firstName")){
        document.getElementById("loginContent").innerHTML = `
        <img class="mb-4 d-flex mx-auto form-signin__logo" src="https://img.icons8.com/color/96/000000/dog-bowl.png"
        alt="" width="80" height="80">
        <h1 class="h3 mb-3 font-weight-normal form-signin__title">Sign in</h1>
        <!--<label for="inputEmail" class="sr-only form-signin__label">Email address</label>-->
        <input type="email" name="email" id="inputEmail" class="form-control form-signin__input"
        placeholder="Email address" required autofocus>
        <!--<label for="inputPassword" class="sr-only form-signin__label">Password</label>-->
        <input type="password" name="password" id="inputPassword" class="form-control form-signin__input"
        placeholder="Password" required>
        <div class="checkbox mb-3 form-signin__remember">
        <input type="checkbox" value="false" name="remember" id="inputRemember" onclick="handleCheckbox(this)">
        <label>Remember me</label>
        </div>
        <button class="btn btn-lg btn-primary btn-block mb-2 form-signin__submit" type="submit">Sign in</button>
        <p class="mt-3 mb-1">Don't have an account yet?</p>
        <p class="mt-0 mb-2">Register
        <a href="../register.html" class="link-primary">here</a>
        </p>
        `
        }else{
            document.getElementById("loginContent").innerHTML = `
            <img class="mb-4 d-flex mx-auto form-signin__logo" src="https://img.icons8.com/color/96/000000/dog-bowl.png"
            alt="" width="80" height="80">
            <h1 class="h3 mb-3 font-weight-normal form-signin__title">You're currently signed in as `+ window.localStorage.getItem("firstName") + ` :)</h1>
            <p class="mt-3 mb-1">Want to switch accounts?</p>
            <p class="mt-0 mb-2">Log in
            <a id="resetButton" onclick="resetUser()" href="\" class="link-primary">here</a>
            </p> 
            `
        }
    }
    window.resetUser = resetUser;
    function resetUser(){
        console.log("work");
        window.localStorage.clear();
    }
    //document.getElementById("resetButton").addEventListener("click", resetUser(), false);