// HTML DOM ELEMENTE
//Button
const DOMButtonRight = document.querySelector(".right");
const DOMButtonFalse = document.querySelector(".false");
const DOMButtonContinue = document.querySelector("#continue");
const DOMButtonMulti = document.querySelector("#multi");
const DOMButtonMultbutton = document.querySelectorAll(".multbutton");
const DOMButtonNext = document.querySelector(".-next");
const DOMCheckButton = document.querySelector("#check");
const DOMButtonExit = document.querySelectorAll(".reset");
//"Klicken Sie auf die Karte"
const DOMIntro = document.querySelector("#intro");
// Pop up
const popupFirst = document.querySelector("#popup-first");
const popupRound = document.querySelector("#popup-round");
const PopupClose = document.querySelectorAll(".close");
// Blur HTML Elemente
const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#background");
const DOMWrapper = document.querySelector("#wrapper");
//Karte (zum drehen)
const DOMCard = document.getElementById("card");
const CardBack = document.querySelector(".card--back");
const CardFront = document.querySelector(".card--front");

//VARIABLEN UND KONSTANTEN
const curentMethode = document.querySelector(".activeMethode").innerText;
const choosedCourse = document.querySelectorAll(".ON");
const currentCard = document.getElementById("counter");
const course = document.querySelector(".course");
let falseCounter = 0; //zählt wie viele Falsche der Spieler in einer Runde hat
let inx = 0;
let round = 1;
let firstArray = [];
let oddArray = []; //mod 2 = 1
let evenArray = []; //mod 2 = 0
let methode;
//nur für Methode 2 gebraucht
let arrayMale = [];
let arrayFemale = [];
let mapFemale;
let mapMale;
let showButtons = [1, 2, 3];
let nameRichtig; 
let randomName1;
let randomName2; 
let arrayGender;
let mapGender;

//ALLGEMEINE ON KLICK EVENTS
// x-Button, navigiert zur Startseite
DOMButtonExit.forEach((element) => {
  element.addEventListener("click", stopGame);
});
DOMButtonContinue.addEventListener("click", continueGame);

// POPUP
function firstPopUp() {
  blurElements();
  popupFirst.style.display = "block";
  let DOMH3 = popupFirst.querySelector("#test");
  DOMH3.innerHTML = "";
  DOMH3.innerHTML = `Welchen Kurs wollen Sie lernen?`;
}

function roundPopUp(p_round, p_falseCounter) {
  if (p_falseCounter == 0 && p_round % 2 == 1) {
    blurElements();
    popupFirst.style.display = "block";
    let DOMH3 = popupFirst.querySelector("#test");
    DOMH3.innerHTML = "";
    DOMH3.innerHTML = `Super! Sie haben Runde ${p_round} ohne einen einzigen Fehler geschafft!
    <br />  Wählen Sie einen neuen Kurs, den Sie lernen möchten`;
    stopGame();
  } else {
    popupRound.style.display = "block";
    blurElements();
    let DOMH3 = popupRound.querySelector("#round");
    DOMH3.innerHTML = "";
    DOMH3.innerHTML = `Sie haben Runde ${p_round} geschafft!`;
  }
}

//Funktion um Popups auszublenden
function hidePopUp() {
  DOMNav.classList.remove("blur");
  DOMBackground.classList.remove("blur");
  DOMWrapper.classList.remove("blur");

  popupFirst.style.display = "none";
  popupRound.style.display = "none";
}

//Blur Effekt wenn das Popup aktiv ist
function blurElements() {
  DOMNav.classList.add("blur");
  DOMBackground.classList.add("blur");
  DOMWrapper.classList.add("blur");
}


// FLIP INDEX CARD
function flipCard() {
  DOMCard.classList.add("card_hover");
  CardBack.classList.add("display");
  CardFront.classList.remove("display");

  if (methode == "rightwrong") {
    DOMCheckButton.style.display = "flex";
    DOMIntro.style.display = "none";
  } 
  else if (methode == "multiplechoice") {
    DOMButtonMulti.style.display = "none";
    DOMButtonNext.style.display = "flex";
    multipleKarte(event.target);
  }
}

function flipCardReverse() {
  DOMCard.classList.remove("card_hover");
  CardBack.classList.remove("display");
  CardFront.classList.add("display");

  if (methode == "rightwrong") {
    DOMCheckButton.style.display = "none";
    DOMIntro.style.display = "inline";
  } 
  else if (methode == "multiplechoice") {
    DOMButtonMulti.style.display = "flex";
    DOMButtonNext.style.display = "none";
  }
}


//hier zur initial definition aller variablen und arrays die erstellt werden müssen
function methodRW() {
  methode = "rightwrong";
  hidePopUp();
  createArrayRW();

  DOMCard.addEventListener("click", flipCard);
  DOMButtonRight.addEventListener("click", countAndNew);
  DOMButtonFalse.addEventListener("click", displayCardUp);

  DOMIntro.style.display = "inline";
}

function methodMC() {
  methode = "multiplechoice";
  hidePopUp();
  createArrayMC();
  DOMButtonMulti.style.display = "flex";

  DOMButtonMultbutton.forEach((element) => {
    element.addEventListener("click", flipCard);
  });
  DOMButtonNext.addEventListener("click", countAndNew);
}

//FUNKTION FÜR DEN ABLAUF DER KARTEN

// Auswahl des Kurses und aufrufen der richtigen Methode(je nach HTML-Seite)
choosedCourse.forEach((element) => {
  element.addEventListener("click", (event) => {
    setCourse(event.target);
    if(curentMethode == "KARTEIKARTEN"){
      methodRW();
    }
    else if(curentMethode == "MULTIPLECHOICE"){
      methodMC();
    }
  });
});

//verändert beim auswählen eines Kurses den Kursnamen
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
  switch (course.innerHTML) {
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

//Maps für Multiplechoice Methode
function getStudentMap(KursGender) {
  let map;
  switch (KursGender) {
    case "ON19Female":
      map = new Map()
      .set("1", "Lisa Albers")
      .set("3", "Nina Eberle")
      .set("6", "Larissa Eirich")
      .set("7", "Dalma Balogh")
      .set("10", "Katharina Barth")
      .set("11", "Anne-Kathrin Dortleff")
      .set("12", "Milena Fiorino")
      .set("14", "Julia Henschel")
      .set("15", "Nicole Höfler")
      .set("16", "Lina Käfer")
      .set("17", "Alicia Kilian")
      .set("20", "Kristin Zenger")
      .set("21", "Laura Krumm")
      .set("22", "Lara Neumaier")
      .set("23", "Jessica Noe")
      .set("24", "Livia Maxhaku")
      .set("26", "Katharina Schmitt")
      .set("28", "Leonie Müller")
      .set("30", "Alischa Thomas")
      .set("31", "Juliane Speck");
      return map;
    case "ON18Female":
      map = new Map()
      .set("1", "Jana Ballweg")
      .set("3", "Theresa Brenner")
      .set("5", "Fabienne Burgert")
      .set("6", "Christina Bünnagel");
      return map;
    case "ON19Male":
      map = new Map()
      .set("2", "Steffen Brendle")
      .set("4", "Jonas Althoff")
      .set("5", "Christian Dänzer")
      .set("8", "Laurin Dörre")
      .set("9", "Pascal Feinauer")
      .set("13", "Fabian Geitner")
      .set("18", "Patrick Mäder")
      .set("19", "Marco Scotarello")
      .set("25", "Martin Panaget")
      .set("27", "Niklas Schikora")
      .set("29", "Calvin Reibenspieß");
      return map;
    case "ON18Male":
      map = new Map()
      .set("2", "Moritz Banhardt")
      .set("4", "Nils Eisenhauer")
      .set("7", "Frederik Hellbauer");
      return map;
    case "ON17":
      return 0;
    default:
      return "Jemand hat einen Fehler gemacht";
  }
}

//Funktion erstellt Array beim ersten mal
//Methode richtig falsch
function createArrayRW() {
  let num = getStudents();
  for (let x = num; x > 0; x--) {
    firstArray.push(x);
  }
  firstArray = shuffle(firstArray);
  showImages();
}

function createArrayMC() {

  mapFemale = getStudentMap(`${course.innerHTML}Female`);
  mapMale = getStudentMap(`${course.innerHTML}Male`);

  let stringArrayF = Array.from(mapFemale.keys());
  stringArrayF.forEach((element) => {
    arrayFemale.push(parseInt(element));
  });

  let stringArrayM = Array.from(mapMale.keys());
  stringArrayM.forEach((element) => {
    arrayMale.push(parseInt(element));
  });

  firstArray = arrayFemale.concat(arrayMale);
  firstArray = shuffle(firstArray);

  showImages();
}

function getName(stringNumber){

  if (mapFemale.has(`${stringNumber}`)){
    arrayGender = arrayFemale;
    mapGender = mapFemale;
    nameRichtig = mapFemale.get(`${stringNumber}`);

    randomName1 = getRandomName(arrayGender, mapGender);
    randomName2 = getRandomName2(arrayGender, mapGender, randomName1);
  
  }
  else if (mapMale.has(`${stringNumber}`)){
    arrayGender = arrayMale;
    mapGender = mapMale;
    nameRichtig = mapMale.get(`${stringNumber}`);
    
    randomName1 = getRandomName(arrayGender, mapGender);
    randomName2 = getRandomName2(arrayGender, mapGender, randomName1);
  }

  randomButton(nameRichtig, randomName1, randomName2);
}

function getRandomName(p_arr, p_map){
  let number = p_arr[Math.floor(Math.random() * p_arr.length)];
  let randomName = p_map.get(`${number}`);
  
  if(randomName == nameRichtig){
    randomName = getRandomName(p_arr, p_map);
  }
  return randomName;
}

function getRandomName2(p_arr, p_map, p_name1){
  let randomNameNew = getRandomName(p_arr, p_map); 
  
  if(randomNameNew == p_name1){
    randomNameNew = getRandomName2(p_arr, p_map, p_name1);
  }
  return randomNameNew;
}

// Shuffle Funktion, um den Namen random auf die Buttons auszugeben
function randomButton(nameRichtig, randomName1, randomName2) {
  showButtons = shuffle(showButtons);

  let post1 = document.getElementById(showButtons[0]);
  post1.innerHTML = nameRichtig;

  let post2 = document.getElementById(showButtons[1]);
  post2.innerHTML = randomName1;

  let post3 = document.getElementById(showButtons[2]);
  post3.innerHTML = randomName2;
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
  if(methode=="multiplechoice"){
    getName(arr[inx]);
  }
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

//Counter Funktion (Mengenzaehler)
function counterUp(p_inx, p_arr) {
  let arrlength = p_arr.length;
  currentCard.innerText = "";
  currentCard.innerText = `Karte: ${p_inx + 1}/${arrlength}`;
}

//Funktion zum Mischen
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
  let num;
  let arr = getCurrentArray();

  if (methode == "rightwrong"){
    countAndNew();
    num = arr[inx - 1];
  }
  else if (methode == "multiplechoice"){
    num = arr[inx];
  }
    
  if (round == 1) {
    evenArray.push(num, num);
  } else if (round % 2 == 1) {
    evenArray.push(num, num);
  } else if (round % 2 == 0) {
    if (!oddArray.includes(num)) {
      oddArray.push(num);
    }
  }
  console.log(evenArray);
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
  console.log(evenArray);
}

// Arrays und Varaiblen werden zurück gesetzt
function stopGame() {
  firstArray.length = [];
  oddArray.length = [];
  evenArray.length = [];

  inx = 0;
  round = 1;
  falseCounter = 0;
}


const anzeige = document.querySelector(".anzeige");
const rand = document.querySelector(".card--back");
const DOMAnzeige = document.querySelector(".richtigFalsch");

function multipleKarte(target) {
  let name = target.innerHTML;
  if (name == nameRichtig) {
    anzeige.innerHTML = "Super, richtig!";
    anzeige.style.color = 'green';
    rand.style.border = 'solid 3px green';
  } 
  else {
    anzeige.innerHTML = "Das war leider falsch.";
    anzeige.style.color = 'red';
    rand.style.border = 'solid 3px red';
    displayCardUp();
  }
}

