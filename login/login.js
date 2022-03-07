import {toast} from "../helperFunctions/toast.js";

window.onload = function() {
    initLogin();
    addEventListeners()
};

function initLogin() {
    //Initialize LocalStorage - Hardcoded email and user
    localStorage.setItem('email', 'test@itu.dk');
    localStorage.setItem('password', '123456');
}

//Change scope of functions to global
window.handleCheckbox = handleCheckbox;

function addEventListeners() {
    //Form Submit
    document.getElementById("loginForm").addEventListener('submit', handleForm);
}

//Events Callbacks
    //Login Form Handler
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
    //Check if the user and password entered are correct
    function checkUserPassword(user,password) {
        if (user !== localStorage.getItem("email")) {
            return {message: "The email does not correspond to an existing account", status: false}
        }
        if (password !== localStorage.getItem("password")) {
            return {message: "The password is incorrect", status: false}
        }
        return {message: "Login successful into PetStore", status: true}
    }