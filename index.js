// HTML DOM ELEMENTE
const NAVCards = document.querySelector("#nav-index-card");
const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#background");
const DOMWrapper = document.querySelector("#wrapper");
const DOMButtonRight = document.querySelector(".right");
const DOMButtonFalse = document.querySelector(".false");
const DOMButtonContinue = document.querySelector("#continue");
const DOMButtonExit = document.querySelector(".exit");
const DomButtonReset = document.querySelector("#resetArray");

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
function roundPopUp(p_round, p_falseCounter){
    blurElements();
    popupRound.style.display = "block";
    let DOMH3 = popupRound.querySelector("#round");

    if (p_falseCounter == 0){
      DOMH3.innerHTML = "";
      DOMH3.innerHTML = `Super! Sie haben Runde ${p_round} ohne einen einzigen Fehler geschafft!
      Wählen Sie einen neuen Kurs, den Sie lernen möchten`;
    }
    else {
    DOMH3.innerHTML = "";
    DOMH3.innerHTML = `Sie haben Runde ${p_round} geschafft!`;
    }
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



//FUNKTION FÜR DEN ABLAUF DER KARTEN

const currentCard = document.getElementById('counter');
let falseCounter = 0; //zählt wie viele Falsche der Spieler in einer Runde hat
let inx = 0;
let round = 1;
let firstArray = [];
let oddArray= []; //mod 2 = 1
let evenArray= []; //mod 2 = 0

//Klick-Events
DOMButtonRight.addEventListener("click", countAndNew);
DOMButtonFalse.addEventListener("click", countAndNew);

DOMButtonFalse.addEventListener("click", displayCardUp);

DOMButtonContinue.addEventListener("click", continueGame);
DOMButtonExit.addEventListener("click", exitGame);

DomButtonReset.addEventListener("click", stopGame);


// Gibt Pfad des jeweiligen Kurses zurück 
// wird später on click auf den button 0N.. aufgerufen
const course = document.querySelector('.course');
function getSrc(){
  switch(course.innerHTML){  //innerHTML ändern und klick funktion
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

// Hier wird die Anzahl der Studenten in einem Kurs eingegeben und abgerufen
function getStudents(){
  switch(course.innerHTML){
      case 'ON19':
          return 19;
      case 'ON18':
          return 30;
      case 'ON17':
          return 27;
      default:
          return 'Jemand hat einen Fehler gemacht'
  }
}

//Funktion erstellt Array beim ersten mal, soll bei Click auf den 
//Kurs Button ausgelöst werden
createArray();
function createArray(){
  let num = getStudents();
  
  for (let x = num; x > 0; x--) {
    firstArray.push(x);
  }
  firstArray = shuffle(firstArray);
  console.log(firstArray);
  showImages();
}

//Hier wird das Aktuelle Array der Runde abgefragt
function getCurrentArray(){
  if (round == 1){
    return firstArray;
  }
  else if (round%2 == 1){
    return oddArray;
  }
  else if (round%2 == 0){
    return evenArray;
  }
  else {
    console.log("fehler");
  }
}

//Macht jeweiliges Bild sichtbar und ruft die Funktion auf für den Mengenzähler
function showImages(){
  let arr = getCurrentArray();
  //Vorderseite
  CardFront.firstElementChild.src = `${getSrc()}${arr[inx]}-vs.jpeg`; 
  //Rückseite
  CardBack.firstElementChild.src = `${getSrc()}${arr[inx]}-rs.jpeg`;

  counterUp(inx, arr);
}

// Wird bei Klick auf einen der Button ausgelöst, zeigt nächste Karte an
function countAndNew(){
  inx++;
  showImages();
  let arr = getCurrentArray();

  if (inx == arr.length){
    
    roundPopUp(round, falseCounter);
  }

  flipCardReverse();
}

//COUNTER FUNKTION
function counterUp(p_inx, p_arr){
   let arrlength = p_arr.length;
   console.log(p_inx, arrlength);
   currentCard.innerText = "";
   currentCard.innerText = `Karte: ${p_inx+1}/${arrlength}`;
}

//Funktion zum mischen
function shuffle(p_arr) {
  let a = p_arr;
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//Hier die Funktion bei Klick auf Falsch (nicht gewusst)
function displayCardUp(){

  falseCounter++;

  let arr = getCurrentArray();
  let num = arr[inx-1];
  if (round == 1){
    evenArray.push(num, num);
  }
  else if (round%2 == 1){
    evenArray.push(num, num);
  }
  else if (round%2 == 0){
    if(!oddArray.includes(num)){
      oddArray.push(num);
    }
    else {
      console.log(oddArray);
    }
  }  
}

// Arrays werden geändert und geshuffelt
function continueGame(){
    if (round == 1){
      evenArray = shuffle(evenArray);
    }
    else if (round%2 == 0){
      oddArray = oddArray.concat(firstArray);
      evenArray = [];
    }
    else if (round%2 == 1){
      evenArray = shuffle(evenArray);
      oddArray = [];
    }
  falseCounter = 0;
  inx = 0;
  round ++;
  showImages();
  hidePopUp();
}

function exitGame(){}


// Arrays werden zurück gesetzt 
function stopGame(){
arr = firstArray;
arr.length = [];

inx = 0;
round = 1;
falseCounter = 0;
}