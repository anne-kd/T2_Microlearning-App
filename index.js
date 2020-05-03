// HTML DOM ELEMENTE
const NAVCards = document.querySelector("#nav-index-card");
const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#background");
const DOMWrapper = document.querySelector("#wrapper");
const DOMButtonRight = document.querySelector(".right");
const DOMButtonFalse = document.querySelector(".false");
const DOMButtonContinue = document.querySelector("#continue");
const DOMButtonReset = document.querySelector("#exit");
const DOMButtonMulti = document.querySelector("#multi");
const DOMButtonMultbutton = document.querySelectorAll(".multbutton");
const DOMButtonNext = document.querySelector(".-next");
const DOMIntro = document.querySelector("#intro");

const DOMButtonExit = document.querySelectorAll(".reset");
DOMButtonExit.forEach((element) => {
  element.addEventListener("click", stopGame);
});
// POP UP
const popupFirst = document.querySelector("#popup-first");
const popupRound = document.querySelector("#popup-round");
const popupLearningMethod = document.querySelector("#popup-learningMethod");

const PopupClose = document.querySelectorAll(".close");

const method1 = document.querySelector("#rightnwrong");
const multiple = document.querySelector("#multiple");


function firstPopUp() {
  blurElements();
  popupFirst.style.display = "block";
  let DOMH3 = popupFirst.querySelector("#test");
  DOMH3.innerHTML = "";
  DOMH3.innerHTML = `Welchen Kurs wollen Sie lernen?`;
}

function methodPopUp(){
  blurElements();
  popupLearningMethod.style.display = "block";

  method1.addEventListener("click", methodRW);
  multiple.addEventListener("click", methodMC);
}

function roundPopUp(p_round, p_falseCounter) {
  if (p_falseCounter == 0 && p_round % 2 == 1) {
    blurElements();
    popupFirst.style.display = "block";
    let DOMH3 = popupFirst.querySelector("#test");
    DOMH3.innerHTML = "";
    DOMH3.innerHTML = `Super! Sie haben Runde ${p_round} ohne einen einzigen Fehler geschafft!
      Wählen Sie einen neuen Kurs, den Sie lernen möchten`;
    stopGame();
  } else {
    popupRound.style.display = "block";
    blurElements();
    let DOMH3 = popupRound.querySelector("#round");
    DOMH3.innerHTML = "";
    DOMH3.innerHTML = `Sie haben Runde ${p_round} geschafft!`;
  }
}
let methode;
//hier zur initial definition aller variablen und arrays die erstellt werden müssen
function methodRW(){
  methode = "rightwrong";
  hidePopUp();
  createArrayRW();
  DOMCard.addEventListener("click", flipCard);
  DOMIntro.style.display = "inline";
}

function methodMC() {
  methode = "multiplechoice";
  hidePopUp();

  DOMIntro.style.display = "none";
  //createArrayMC();
  DOMButtonMulti.style.display = "flex";

  DOMButtonMultbutton.forEach(element => {
    element.addEventListener("click", flipCard);
  });
  DOMButtonNext.addEventListener("click", flipCardReverse);
}

//Funktion um Popups auszublenden
function hidePopUp() {
  DOMNav.classList.remove("blur");
  DOMBackground.classList.remove("blur");
  DOMWrapper.classList.remove("blur");

  popupFirst.style.display = "none";
  popupRound.style.display = "none";
  popupLearningMethod.style.display = "none";
}

//Funktion bei Popup Einblendung 
function blurElements() {
  DOMNav.classList.add("blur");
  DOMBackground.classList.add("blur");
  DOMWrapper.classList.add("blur");
}


// FLIP INDEX CARD
const DOMCard = document.getElementById("card");
const CardBack = document.querySelector(".card--back");
const CardFront = document.querySelector(".card--front");
const DOMCheckButton = document.querySelector("#check");


function flipCard() {
  DOMCard.classList.add("card_hover");
  CardBack.classList.add("display");
  CardFront.classList.remove("display");
  if (methode == "rightwrong"){
    DOMCheckButton.style.display = "flex";
    DOMIntro.style.display = "none";
  }
  else if (methode =="multiplechoice"){
    DOMButtonMulti.style.display = "none";
    DOMButtonNext.style.display = "flex";
  }
  
}

function flipCardReverse() {
  DOMCard.classList.remove("card_hover");
  CardBack.classList.remove("display");
  CardFront.classList.add("display");
  if (methode == "rightwrong"){
    DOMCheckButton.style.display = "none";
    DOMIntro.style.display = "inline";
  }
  else if (methode =="multiplechoice"){
    DOMButtonMulti.style.display = "flex";
    DOMButtonNext.style.display = "none";
  }
}

// Ändern des Kurses
const courseNamePopUp = document.querySelectorAll(".ON");

courseNamePopUp.forEach((element) => {
  element.addEventListener("click", (event) => {
    setCourse(event.target);
    hidePopUp();
    methodPopUp();
  });
});

//FUNKTION FÜR DEN ABLAUF DER KARTEN
const currentCard = document.getElementById("counter");
let falseCounter = 0; //zählt wie viele Falsche der Spieler in einer Runde hat
let inx = 0;
let round = 1;
let firstArray = [];
let oddArray = []; //mod 2 = 1
let evenArray = []; //mod 2 = 0

//Klick-Events



DOMButtonRight.addEventListener("click", countAndNew);
DOMButtonFalse.addEventListener("click", displayCardUp);

DOMButtonContinue.addEventListener("click", continueGame);
DOMButtonReset.addEventListener("click", stopGame);

//verändert beim auswählen eines Kurses den Kursnamen
const course = document.querySelector(".course");

function setCourse(courseName) {
  switch (courseName.innerHTML) {
    case "ON19":
      course.innerHTML = "ON19";
      break;
    case "ON18":
      course.innerHTML = "ON18";
      break;
    case "ON17":
      course.innerHTML = "ON17";
      break;
    default:
      "Jemand hat einen Fehler gemacht";
      break;
  }
}

function getSrc() {
  switch (
    course.innerHTML //innerHTML ändern und klick funktion
  ) {
    case "ON19":
      return "assets/ON19/";
    case "ON18":
      return "assets/ON18/";
    case "ON17":
      return "assets/ON17/";
    default:
      return "Jemand hat einen Fehler gemacht";
  }
}

// Hier wird die Anzahl der Studenten in einem Kurs eingegeben und abgerufen
function getStudents() {
  switch (course.innerHTML) {
    case "ON19":
      return 31;
    case "ON18":
      return 7;
    case "ON17":
      return 0;
    default:
      return "Jemand hat einen Fehler gemacht";
  }
}

//Funktion erstellt Array beim ersten mal, soll bei Click auf den
//Kurs Button ausgelöst werden
function createArrayRW() {
  let num = getStudents();
  console.log(num);
  for (let x = num; x > 0; x--) {
    firstArray.push(x);
  }
  firstArray = shuffle(firstArray);
  console.log(firstArray);
  showImages();
}

//Hier wird das Aktuelle Array der Runde abgefragt
function getCurrentArray() {
  if (round == 1) {
    return firstArray;
  } else if (round % 2 == 1) {
    return oddArray;
  } else if (round % 2 == 0) {
    return evenArray;
  } else {
    console.log("fehler");
  }
}

//Macht jeweiliges Bild sichtbar und ruft die Funktion auf für den Mengenzähler
function showImages() {
  let arr = getCurrentArray();
  //Vorderseite
  CardFront.firstElementChild.src = `${getSrc()}front/${arr[inx]}-vs.png`;
  //Rückseite
  CardBack.firstElementChild.src = `${getSrc()}back/${arr[inx]}-rs.png`;

  counterUp(inx, arr);
}

// Wird bei Klick auf einen der Button ausgelöst, zeigt nächste Karte an
function countAndNew() {
  inx++;
  showImages();
  let arr = getCurrentArray();
  if (inx == arr.length) {
    roundPopUp(round, falseCounter);
  }
  flipCardReverse();
}

//COUNTER FUNKTION
function counterUp(p_inx, p_arr) {
  let arrlength = p_arr.length;
  console.log(p_inx, arrlength);
  currentCard.innerText = "";
  currentCard.innerText = `Karte: ${p_inx + 1}/${arrlength}`;
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
function displayCardUp() {
  falseCounter++;
  countAndNew();

  let arr = getCurrentArray();
  let num = arr[inx - 1];
  if (round == 1) {
    evenArray.push(num, num);
  } else if (round % 2 == 1) {
    evenArray.push(num, num);
  } else if (round % 2 == 0) {
    if (!oddArray.includes(num)) {
      oddArray.push(num);
    } else {
      console.log(oddArray);
    }
  }
}
// Arrays werden geändert und geshuffelt
function continueGame() {
  if (round == 1) {
    evenArray = shuffle(evenArray);
  } else if (round % 2 == 0) {
    oddArray = oddArray.concat(firstArray);
    oddArray = shuffle(oddArray);
    evenArray = [];
  } else if (round % 2 == 1) {
    evenArray = shuffle(evenArray);
    oddArray = [];
  }
  falseCounter = 0;
  inx = 0;
  round++;
  showImages();
  hidePopUp();
}

// Arrays und Varaiblen werden zurück gesetzt
function stopGame() {
  let arr = firstArray;
  arr.length = [];
  oddArray.length = [];
  evenArray.length = [];
  inx = 0;
  round = 1;
  falseCounter = 0;
  console.log(arr);
}
