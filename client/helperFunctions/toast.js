//Render a Bootstrap toast
    //For type parameter go to Bootstrap background utiliy: https://getbootstrap.com/docs/5.1/utilities/background/
    //Pending improvement: Use Bootstrap native Toast Functions: https://getbootstrap.com/docs/5.1/components/toasts/#basic
//Receives as parameter the message (string), the type (string) and how much time in milliseconds should pass until the toast is self-destroyed (number)
//Example: toast("Oh no, wrong answer", "warning",5000) ---> will render a toast with that message, in a orange warning background colour and for 5 seconds
//If type is not passed the default is "success"
//If milisecs is not passed the default is 2 seconds (2000 millisecs)
export function toast(message,type,milisecs) {
    //Default values
    var cType= type ? type : "success";
    var cMilisecs= milisecs ? milisecs : 2000;

    var alertPlaceholder = document.body
    var wrapper = document.createElement('html')
    wrapper.innerHTML = 
        '<div class="toast align-items-center text-white bg-'+ cType +' border-0 show alert-message-box" role="alert" aria-live="assertive" aria-atomic="true">'
        + '<div class="d-flex">'
        + '<div class="toast-body">'
        + message
        + '</div>'
        + '<button type="button" id="closeToast" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>'
        + '</div></div>'
    alertPlaceholder.append(wrapper);

    //Bind event listener to Toast close button
    document.getElementById("closeToast").addEventListener('click', function(e){e.target.parentElement.parentElement.innerHTML = ""})
    
    //Deletes Alert Message after X secs (default 2 seconds)
    setTimeout(function () {
        wrapper.innerHTML = "";
    }, cMilisecs);
}