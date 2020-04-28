// HTML DOM ELEMENTE
const NAVCards = document.querySelector("#nav-index-card");
const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#background");
const DOMWrapper = document.querySelector("#wrapper");
const DOMButtonRight = document.querySelector(".right");
const DOMButtonFalse = document.querySelector(".false");
const DOMButtonContinue = document.querySelector(".continue");
const DOMButtonExit = document.querySelector(".exit");

// POP UP
const popupFirst = document.querySelector("#popup-first");
const popupRound = document.querySelector("#popup-round");

const PopupClose = document.querySelectorAll(".close");

PopupClose.forEach(element => {
  element.addEventListener("click", hidePopUp);
});


// function firstPopUp() {
//   blurElements();
//   popupFirst.style.display = "block";
// }
function roundPopUp(p_round) {
  blurElements();
  popupRound.style.display = "block";
  let DOMH3 = popupRound.querySelector("#round");
  DOMH3.innerHTML = "";
  DOMH3.innerHTML = `Sie haben Runde ${p_round} geschafft!`;

}

function hidePopUp() {
  DOMNav.classList.remove("blur");
  DOMBackground.classList.remove("blur");
  DOMWrapper.classList.remove("blur");

  popupFirst.style.display = "none";
  popupRound.style.display = "none";
}

function blurElements() {
  DOMNav.classList.add("blur");
  DOMBackground.classList.add("blur");
  DOMWrapper.classList.add("blur");
}

// Ändern des Kurses 
const courseNamePopUp = document.querySelectorAll('#ON');

courseNamePopUp.forEach(element=>{
  element.addEventListener('click', (event)=>{
    setCourse(event.target);
    hidePopUp();
  })
});


// FLIP INDEX CARD
const DOMCard = document.getElementById('card');
const CardBack = document.querySelector(".card--back");
const CardFront = document.querySelector(".card--front");
const DOMCheckButton = document.querySelector("#check");

DOMCard.addEventListener('click', function () {
  DOMCard.classList.add('card_hover');
  CardBack.classList.add('display');
  CardFront.classList.remove('display');
  DOMCheckButton.style.display = "flex";
});


function flipCardReverse() {
  DOMCard.classList.remove('card_hover');
  CardBack.classList.remove('display');
  CardFront.classList.add('display');
  DOMCheckButton.style.display = "none";
}



//verändert beim auswählen eines Kurses den Kursnamen
const course = document.querySelector('.course');
function setCourse(courseName){
  switch(courseName.innerHTML){  
    case 'ON19':
      course.innerHTML = 'ON19';
      break;
    case 'ON18':
      course.innerHTML = 'ON18';
      break;
    case 'ON17':
      course.innerHTML = 'ON17';
      break;
    default:
        'Jemand hat einen Fehler gemacht'
      break;
  }
}

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

function getStudents() {
  switch (course.innerHTML) {
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

// ROUND END
const currentCard = document.getElementById('counter');
let count = 1;
let inx = 0;
let round = 1;
let firstArray = [];
let oddArray= []; //mod 2 = 1
let evenArray= []; //mod 2 = 0


//Funktion erstellt Array beim ersten mal, soll bei Click auf den 
//Kurs Button ausgelöst werden
createArray();
function createArray() {
  let num = getStudents();

  for (let x = num; x > 0; x--) {
    firstArray.push(x);
  }
  firstArray = shuffle(firstArray);
  console.log(firstArray);
  showImages();
}

//Hier evtl für später wenn wir unterschiedliche Arrays haben
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

//Macht jeweiliges Bild sichtbar
function showImages() {
  let arr = getCurrentArray();
  //Vorderseite
  CardFront.firstElementChild.src = `${getSrc()}${arr[inx]}-vs.png`;
  //Rückseite
  CardBack.firstElementChild.src = `${getSrc()}${arr[inx]}-rs.png`;
}

//Klick-Events
DOMButtonRight.addEventListener("click", countAndNew);
DOMButtonFalse

// DOMButtonRight.addEventListener("click", displayCardsingle);
DOMButtonFalse.addEventListener("click", displayCardUp);

DOMButtonContinue.addEventListener("click", continueGame);
DOMButtonExit.addEventListener("click", exitGame);

function countAndNew(){
  flipCardReverse();
  count++;
  inx++;

  showImages();
  let arr = getCurrentArray();

  counterUp(count, arr);
  if (count == arr.length + 1) {
    roundPopUp(round);
    console.log(arr);
    count = 1;
    inx = 0;
    round++;
  }
}

//COUNTER FUNKTION
function counterUp(p_count, p_arr) {
  let arrlength = p_arr.length;
  console.log(p_count, arrlength);
  currentCard.innerText = "";
  currentCard.innerText = `Karte: ${count}/${arrlength}`;
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

//Nummer wird zweimal in ein neues Array eingefügt (click auf false)
function displayCardUp() {
  let arr = getCurrentArray();
  let num = arr[inx-1];
  if (round == 1){
    evenArray.push(num, num);
    console.log(evenArray);
  }
  else if (round%2 == 1){
    evenArray.push(num, num);
    console.log(evenArray);
  }
  else if (round%2 == 0){
    oddArray.push(num);
    console.log(oddArray);
  }   
}

function continueGame(){

}

function exitGame(){}