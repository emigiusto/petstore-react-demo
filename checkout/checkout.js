import {createFooter} from "/components/footer.js"
import {createHeader} from "/components/header.js"

window.onload = function() {
    renderHeader();
    renderFooter();
};

function renderFooter(){
    document.getElementById("footer").innerHTML = createFooter();
}

function renderHeader(){
    document.getElementById("navbar").innerHTML = createHeader();
}