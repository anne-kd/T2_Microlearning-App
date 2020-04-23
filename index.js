const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#background");
const DOMWrapper = document.querySelector("#wrapper");

const DOMCard = document.getElementById('card');
const CardBack = document.querySelector(".card--back");
const CardFront = document.querySelector(".card--front");
const DOMButton = document.querySelector(".check");

DOMCard.addEventListener('click', function() {
  DOMCard.classList.add('card_hover');
  CardBack.classList.add('display');
  CardFront.classList.remove('display');
  DOMButton.style.display = "flex";
});
