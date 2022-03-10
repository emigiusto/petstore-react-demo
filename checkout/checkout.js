
function saveForm(){
    saveNames();
    saveUsername();
    saveZip();
    savePaymentSpecs();
  }
  
  function saveNames() {
    // get first name
    let inputFname = document.getElementById("firstName");
    // save first name
    localStorage.setItem("firstName", inputFname.value);
    // get last name
    let inputLname = document.getElementById("lastName");
    // save last name
    localStorage.setItem("lastName", inputLname.value);
  }
  
  function saveUsername() {
    // get username
    let inputUsername = document.getElementById("username");
    // save username
    localStorage.setItem("username", inputUsername.value);
  }
  
  
  function saveZip() {
    //get Zip
    let inputZip = document.getElementById("zipcode");
    //save Zip
    localStorage.setItem("zipcode", inputZip.value);
  }
  
  function savePaymentSpecs() {
    //get cc name
    let inputCcName = document.getElementById("fullNameoncard");
  
    //save cc name
    localStorage.setItem("fullNameoncard", inputCcName.value);
  
    //get cc nr
    let inputCcNumber = document.getElementById("cc-number");
  
    //save cc nr
    localStorage.setItem("cc-number", inputCcNumber.value);
  
    //get cc expiration
    let inputCcExpire = document.getElementById("cc-expire");
  
    //save cc expiration
    localStorage.setItem("cc-expire", inputCcExpire.value);
  
    //get cc cvv
    let inputCVV = document.getElementById("CVV");
  
    //save cc cvv
    localStorage.setItem("CVV", inputCVV.value);
  }
  
  
  
  function saveCountrySpecs() {
    // how to save from dropdown?
  }