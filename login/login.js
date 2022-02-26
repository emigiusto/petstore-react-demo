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
    //Login Form Handler
    function handleForm(event) { 
        event.preventDefault(); 
        const data = new FormData(event.target);
        var login = checkUserPassword(data.get("email"),data.get("password"))
        if (login.status) { //Success!
            //Hide Login
            document.getElementById("loginForm").classList.add("hidden")
            alert(login.message,"success")
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
        } else {
            alert(login.message,"warning")
        }
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

    //Alert message
    function alert(message, type) {
        var alertPlaceholder = document.body
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible alert-message-box" role="alert">' + message + 
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
        alertPlaceholder.append(wrapper)
        //Deletes Alert Message after 5 secs
        setTimeout(function (){
            wrapper.innerHTML= "";
        }, 5000);
    }