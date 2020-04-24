// HTML DOM ELEMENTE
const NAVCards = document.querySelector("#nav-index-card");
const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#background");
const DOMWrapper = document.querySelector("#wrapper");
const DOMButtonRight = document.querySelector(".right");
const DOMButtonFalse = document.querySelector(".false");

// POP UP
const popupFirst = document.querySelector("#popup-first");
const popupRound = document.querySelector("#popup-round");

const PopupClose = document.querySelectorAll(".close");

NAVCards.addEventListener("click", firstPopUp);
PopupClose.forEach(element => {
  element.addEventListener("click", hidePopUp);
});


function firstPopUp(){
    blurElements();
    popupFirst.style.display = "block";   
}
function roundPopUp(p_round){
    blurElements();
    popupRound.style.display = "block";
    let DOMH3 = popupRound.querySelector("#round");
    DOMH3.innerHTML = "";
    DOMH3.innerHTML = `Sie haben Runde ${p_round} geschafft!`;
    
}

function hidePopUp(){
    DOMNav.classList.remove("blur");
    DOMBackground.classList.remove("blur");
    DOMWrapper.classList.remove("blur");

    popupFirst.style.display = "none";
    popupRound.style.display = "none";
}

function blurElements(){
    DOMNav.classList.add("blur");
    DOMBackground.classList.add("blur");
    DOMWrapper.classList.add("blur");
}






// FLIP INDEX CARD
const DOMCard = document.getElementById('card');
const CardBack = document.querySelector(".card--back");
const CardFront = document.querySelector(".card--front");
const DOMCheckButton = document.querySelector("#check");

DOMCard.addEventListener('click', function() {
  DOMCard.classList.add('card_hover');
  CardBack.classList.add('display');
  CardFront.classList.remove('display');
  DOMCheckButton.style.display = "flex";
});


// ROUND END
let bspArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let count = 9;
let round = 1;

DOMButtonRight.addEventListener("click", countAndNew);
DOMButtonFalse.addEventListener("click", countAndNew);

DOMButtonFalse.addEventListener("click", displayCardUp);


function countAndNew(){
  count ++;
  let arr = getCurrentArray();

  counterUp(count, arr);
  if (count == arr.length){
    roundPopUp(round);
    count = 0;
    round ++;
  }
}


function getCurrentArray(){
  return bspArray;
}
 function counterUp(p_count, p_arr){
   let arrlength = p_arr.length;
   console.log(p_count, arrlength);
   //an dieser Stelle eigentlich counter span.innerhtml von count
   // und arr.length
 }


function displayCardUp(){
  console.log("funktion 2 is working");

}

//let removedItem = fruits.splice(pos, 1) // this is how to remove an item