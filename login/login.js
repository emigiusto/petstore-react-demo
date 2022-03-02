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
            alert(login.message,true)
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
            alert(login.message,false)
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
    function alert(message, status) {
        var alertPlaceholder = document.body
        var type = status ? 'bg-success' : 'bg-danger';
        console.log(type)
        console.log(status)
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="toast align-items-center text-white '+ type +' border-0 show alert-message-box" role="alert" aria-live="assertive" aria-atomic="true">'
                            + '<div class="d-flex">'
                            + '<div class="toast-body">'
                            + message
                            + '</div>'
                            + '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>'
                            + '</div>'
                            + '</div>'
        alertPlaceholder.append(wrapper)
        //Deletes Alert Message after 5 secs
        setTimeout(function (){
            wrapper.innerHTML= "";
        }, 5000);
    }