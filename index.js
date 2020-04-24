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

function flipCardReverse(){
  DOMCard.classList.remove('card_hover');
  CardBack.classList.remove('display');
  CardFront.classList.add('display');
  DOMCheckButton.style.display = "none";
}

// ROUND END
const currentCard = document.getElementById('counter');
//Beispiel Array zur Umsetzung
let bspArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let count = 1;
let round = 1;

DOMButtonRight.addEventListener("click", countAndNew);
DOMButtonFalse.addEventListener("click", countAndNew);

DOMButtonRight.addEventListener("click", displayCardsingle);
DOMButtonFalse.addEventListener("click", displayCardUp);

function countAndNew(){
  flipCardReverse();
  count ++;
  let arr = getCurrentArray();


  counterUp(count, arr);
  if (count == arr.length){
    roundPopUp(round);
    count = 1;
    round ++;
  }
}

//Hier evtl für später wenn wir unterschiedliche Arrays haben
function getCurrentArray(){
  return bspArray;
}

//COUNTER FUNKTION
function counterUp(p_count, p_arr){
   let arrlength = p_arr.length;
   console.log(p_count, arrlength);
   currentCard.innerText = "";
   currentCard.innerText = `Karte: ${count}/${ arrlength}`;
}



//ADD NEW ITEM INTO NEW ARRAY
let newArray= [];

// Hier wird mir für die Anzeige eine Random nummer aus dem Array gegeben
function displayPic(p_arr){
  var randomItem = p_arr[Math.floor(Math.random()*p_arr.length)];
  return(randomItem);
}

//funktion um zu mischen
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Nummer wird zweimal in ein neues Array eingefügt (click auf false)
function displayCardUp(){
  let arr = getCurrentArray();
  let num = displayPic(arr);

    newArray.push(num, num);
    console.log(newArray);
  
}
// Nummer wird einmal in ein neues Array eingefügt
function displayCardsingle(){
  let arr = getCurrentArray();
  let num = displayPic(arr);

    newArray.push(num, num);
    console.log(newArray);
}
