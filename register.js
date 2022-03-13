import { createFooter } from "/components/footer.js";
import { createHeader } from "/components/header.js";

//Waits until every element is loaded on the DOM to avoid
window.onload = function () {
  handleRegisterForm();
  renderHeader();
  renderFooter();
};

function handleRegisterForm() {
  // To do
  document.getElementById("RegisterForm").addEventListener(
    "submit",
    //callback function, when submitted do sth
    function (eventE) {
      eventE.preventDefault();
      console.log(eventE.target);
      const data = new FormData(eventE.target);
      let email = data.get("email");
      console.log(email);

      //Store alle input data into local storage
      localStorage.setItem("email", data.get("email"));
      localStorage.setItem("password", data.get("password"));
      localStorage.setItem("firstName", data.get("firstName"));
      localStorage.setItem("lastName", data.get("lastName"));
      localStorage.setItem("address", data.get("address"));
      localStorage.setItem("city", data.get("city"));
      localStorage.setItem("state", data.get("state"));

      //CHECK STUFF, IF EVERYTHING IS RIGHT THEN REDIRECT:
      window.location.href = "/index.html?email=" + email;
    }
  );
}

function redirectRegister(context) {
  alert(context);
  alert(this);
  context.preventDefault();
}

function renderFooter() {
  document.getElementById("footer").innerHTML = createFooter();
}

function renderHeader() {
  document.getElementById("navbar").innerHTML = createHeader();
}
