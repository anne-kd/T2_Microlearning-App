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


function flipCardReverse(){
  DOMCard.classList.remove('card_hover');
  CardBack.classList.remove('display');
  CardFront.classList.add('display');
  DOMCheckButton.style.display = "none";
}



// Gibt Pfad des jeweiligen Kurses zurück 

const Course = document.querySelector('.course');

function getSrc(){
  switch(Course.innerHTML){
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

function createArray(){
  let path = getSrc();
  let folder = new File (path);
  
  let FileArr = folder.listFiles();
  console.log(FileArr);
}


// ROUND END
const currentCard = document.getElementById('counter');
//Beispiel Array zur Umsetzung
let bspArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
let count = 0;
let round = 1;

//Macht jeweiliges Bild sichtbar
function showImages(){
  let arr = getCurrentArray();
    //Vorderseite
    CardFront.firstElementChild.src = `${getSrc()}${arr[count]}-vs.jpeg`; 
    //Rückseite
    CardBack.firstElementChild.src = `${getSrc()}${arr[count]}-rs.jpeg`;
}

shuffle();
showImages();

DOMButtonRight.addEventListener("click", countAndNew);
DOMButtonFalse.addEventListener("click", countAndNew);

DOMButtonRight.addEventListener("click", displayCardsingle);
DOMButtonFalse.addEventListener("click", displayCardUp);

function countAndNew(){
  flipCardReverse();
  count ++;
  showImages();
  let arr = getCurrentArray();
  createArray();

  counterUp(count, arr);
  if (count == arr.length){
    roundPopUp(round);
    shuffle();
    console.log(arr);
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
function shuffle() {
  let a = getCurrentArray();
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
