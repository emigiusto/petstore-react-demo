//Render a Bootstrap toast
    //For types go to Bootstrap background utiliy: https://getbootstrap.com/docs/5.1/utilities/background/
    //Pending improvement: Use Bootstrap native Toast Functions: https://getbootstrap.com/docs/5.1/components/toasts/#basic
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
    
    //Deletes Alert Message after X secs (default 2)
    setTimeout(function () {
        wrapper.innerHTML = "";
    }, cMilisecs);
}

