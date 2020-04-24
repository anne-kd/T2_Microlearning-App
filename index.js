// POP UP
const NAVCards = document.querySelector("#nav-index-card");
const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#background");
const DOMWrapper = document.querySelector("#wrapper");
const DOMPopup = document.querySelector("#popup");
const PopupClose = document.querySelector("#close");

NAVCards.addEventListener("click", showPopUp);
PopupClose.addEventListener("click", hidePopUp);

function showPopUp(){
    DOMNav.classList.add("blur");
    DOMBackground.classList.add("blur");
    DOMWrapper.classList.add("blur");

    DOMPopup.style.display = "block";
}

function hidePopUp(){
    DOMNav.classList.remove("blur");
    DOMBackground.classList.remove("blur");
    DOMWrapper.classList.remove("blur");

    DOMPopup.style.display = "none";
}







// FLIP INDEX CARD
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





// Show Images 

let imagesArray = [];
let i = 0;
const course = document.querySelector('.course');
const okButton = document.querySelector('.check').firstElementChild;
const cancelButton = document.querySelector('.check').lastElementChild;

okButton.addEventListener('click',showImages);
cancelButton.addEventListener('click',showImages);

for(let i = 1; i<=20; i++){
  imagesArray[i]=i;
}

showImages();

function getSrc(){
  switch(course.innerHTML){
      case 'ON19':
          return 'assets/ON19/';
      case 'ON18':
          return 'assets/ON18/';
      case 'ON17':
          return 'assets/ON17/';
      default:
          return 'Jemand hat einen Fehler gemacht'
  }
}


function showImages(){
  i++;
  if(i<imagesArray.length){
    //Vorderseite
    CardFront.firstElementChild.src = `${getSrc()}${i}-vs.jpeg`; 
    //Rückseite
    CardBack.firstElementChild.src = `${getSrc()}${i}-rs.jpeg`;
  }
}

