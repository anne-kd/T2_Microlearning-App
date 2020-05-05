// HTML DOM ELEMENTE
const NAVCards = document.querySelector("#nav-index-card");
const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#background");
const DOMWrapper = document.querySelector("#wrapper");
const DOMButtonRight = document.querySelector(".right");
const DOMButtonFalse = document.querySelector(".false");
const DOMButtonContinue = document.querySelector("#continue");
const DOMButtonReset = document.querySelector("#exit");

const DOMButtonExit = document.querySelectorAll(".reset");
DOMButtonExit.forEach((element) => {
  element.addEventListener("click", ()=>{
    saveInstancesLocal();
  });
});

// Local Storage 
const localStorage = window.localStorage;
let newUser = true;
//Local Storage Objekt Funktinonen
Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
}

// POP UP
const popupFirst = document.querySelector("#popup-first");
const popupRound = document.querySelector("#popup-round");

const PopupClose = document.querySelectorAll(".close");

NAVCards.addEventListener("click", firstPopUp);
PopupClose.forEach((element) => {
  element.addEventListener("click", hidePopUp);
});


function firstPopUp() {
  blurElements();
  popupFirst.style.display = "block";
  let DOMH3 = popupFirst.querySelector("#test");
  DOMH3.innerHTML = "";
  DOMH3.innerHTML = `Welchen Kurs wollen Sie lernen?`;
}


function roundPopUp(p_round, p_falseCounter) {

    if (p_falseCounter == 0 && p_round%2 == 1) {
      blurElements();
      popupFirst.style.display = "block";
      let DOMH3 = popupFirst.querySelector("#test");
      DOMH3.innerHTML = "";
      DOMH3.innerHTML = `Super! Sie haben Runde ${p_round} ohne einen einzigen Fehler geschafft!
      Wählen Sie einen neuen Kurs, den Sie lernen möchten`;
      //clearStorageCourse();
      stopGame();
    }
    else {
      popupRound.style.display = "block";
      blurElements();
      let DOMH3 = popupRound.querySelector("#round");
      DOMH3.innerHTML = "";
      DOMH3.innerHTML = `Sie haben Runde ${p_round} geschafft!`;
    }
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

// FLIP INDEX CARD
const DOMCard = document.getElementById("card");
const CardBack = document.querySelector(".card--back");
const CardFront = document.querySelector(".card--front");
const DOMCheckButton = document.querySelector("#check");

DOMCard.addEventListener("click", function () {
  DOMCard.classList.add("card_hover");
  CardBack.classList.add("display");
  CardFront.classList.remove("display");
  DOMCheckButton.style.display = "flex";
});

function flipCardReverse() {
  DOMCard.classList.remove("card_hover");
  CardBack.classList.remove("display");
  CardFront.classList.add("display");
  DOMCheckButton.style.display = "none";
}



// Ändern des Kurses 
const courseNamePopUp = document.querySelectorAll('.ON');

courseNamePopUp.forEach(element=>{
  element.addEventListener('click', (event)=>{
    setCourse(event.target);
    checkIfNewUser(event.target);
    hidePopUp();
  })
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
DOMButtonReset.addEventListener("click", ()=>{
  saveInstancesLocal();
});

//Storage

function checkIfNewUser(courseName){
  let session = 'session' + courseName.innerHTML;
  let number = localStorage.getItem(session);
  localStorage.removeItem(session);
  console.log(number);

  if(number==='1'){
    localStorage.setItem(session, '1')
    getInstancesLocal(courseName);
    showImages();
    console.log('wuhu du bist nocheinmal hier')
  }else if(number==null){
    localStorage.setItem(session, '1');
    createArray();
    console.log('wuhu deine erste session')
  }
}

function saveInstancesLocal(){
  let courseName = course.innerHTML;

  let sFalseCounter = `falseCounter${courseName}`;
  localStorage.setItem(sFalseCounter, falseCounter);

  let sInx = `inx${courseName}`;
  localStorage.setItem(sInx, inx);

  let sRound = `round${courseName}`;
  localStorage.setItem(sRound, round);

  let sFirstArray = `firstArray${courseName}`;
  localStorage.setObj(sFirstArray, firstArray);

  let sOddArray = `oddArray${courseName}`;
  localStorage.setObj(sOddArray, oddArray);

  let sEvenArray = `evenArray${courseName}`;
  localStorage.setObj(sEvenArray, evenArray);

  stopGame();
}

/*function clearStorageCourse(){
  let courseName = course.innerHTML;
  let session = 'session' + courseName;
  localStorage.removeItem(session);
  
  let sFalseCounter = `falseCounter${courseName}`;
  localStorage.removeItem(sFalseCounter);
  
  let sInx = `inx${courseName}`;
  localStorage.removeItem(sInx);
  
  let sRound = `round${courseName}`;
  localStorage.removeItem(sRound);
  
  let sFirstArray = `firstArray${courseName}`;
  localStorage.removeObj(sFirstArray);
  
  let sOddArray = `oddArray${courseName}`;
  localStorage.removeObj(sOddArray);
  
  let sEvenArray = `evenArray${courseName}`;
  localStorage.removeObj(sEvenArray);
  console.log('removed items')
}*/

function clearStorage(){
  localStorage.clear();
}

function getInstancesLocal(courseName){
  courseName = courseName.innerHTML;

  let sFalseCounter = `falseCounter${courseName}`;
  console.log(sFalseCounter);
  falseCounter = Number(localStorage.getItem(sFalseCounter));

  let sInx = `inx${courseName}`;
  inx = Number(localStorage.getItem(sInx));

  let sRound = `round${courseName}`;
  round = Number(localStorage.getItem(sRound));

  let sFirstArray = `firstArray${courseName}`;
  firstArray = localStorage.getObj(sFirstArray);

  let sOddArray = `oddArray${courseName}`;
  oddArray = localStorage.getObj(sOddArray);

  let sEvenArray = `evenArray${courseName}`;
  evenArray = localStorage.getObj(sEvenArray);
  //clearStorage();
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
function createArray() {
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
      } 
      else {
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

//clearStorage();