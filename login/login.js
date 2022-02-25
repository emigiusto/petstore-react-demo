window.onload = function() {
    initLogin();
};

function initLogin() {
    //Initialize LocalStorage - Hardcoded email and user
    localStorage.setItem('email', 'test@itu.dk');
    localStorage.setItem('password', '123456');
    //Initialize Event Listeners:
        //Form Submit
        document.getElementById("loginForm").addEventListener('submit', handleForm);
    
}

//Events Callbacks
function handleForm(event) { 
    event.preventDefault(); 
    const data = new FormData(event.target);
    var login = checkUserPassword(data.get("email"),data.get("password"))
    if (login.status) {
        //Hide Login
        document.getElementById("loginForm").classList.add("hidden")
        alert(login.message,"success")
        //Change State on nav bar from NotLoggedIn to LoggedIn
        //... awaiting design details to implement
    } else {
        alert(login.message,"warning")
    }
} 

//Updates value of checkbox in every click
function handleCheckbox(cb) {
    cb.value = cb.checked;
}

//Check user and password
function checkUserPassword(user,password) {
    if (user !== localStorage.getItem("email")) {
        return {message: "The email does not correspond to an existing account", status: false}
    }
    if (password !== localStorage.getItem("password")) {
        return {message: "The password is incorrect", status: false}
    }
    return {message: "You have successfully logged into PetStore", status: true}
}

//Alert message
function alert(message, type) {
    var alertPlaceholder = document.body
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible alert-message-box" role="alert">' + message + 
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
    alertPlaceholder.append(wrapper)
    setTimeout(function (){
        wrapper.innerHTML= "";
    }, 5000);
    
}