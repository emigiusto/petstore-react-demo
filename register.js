//Waits until every element is loaded on the DOM to avoid
window.onload = function() {
    handleRegisterForm();
};

function handleRegisterForm() {
    // To do
    document.getElementById("RegisterForm").addEventListener('submit',
    //callback function, when submitted do sth    
        function(eventE){
            eventE.preventDefault();
            console.log(eventE.target);
            const data = new FormData(eventE.target);
            let email = data.get("email");
            console.log(email);
            //CHECK STUFF, IF EVERYTHING IS RIGHT THEN REDIRECT:
            window.location.href = "/index.html?email="+email;
        } 
    );
};

function redirectRegister(context) {
    alert(context);
    alert(this);
    context.preventDefault();
};

