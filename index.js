const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#background");
const DOMWrapper = document.querySelector("#wrapper");

const DOMCard = document.getElementById('card');
DOMCard.addEventListener("click", flipCard);

function flipCard(){
    DOMCard.classList.add(".card_hover");
}