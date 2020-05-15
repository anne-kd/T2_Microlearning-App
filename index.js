// HTML DOM ELEMENTE
//Button
const DOMButtonRight = document.querySelector(".right");
const DOMButtonFalse = document.querySelector(".false");
const DOMButtonContinue = document.querySelector("#continue");
const DOMButtonMulti = document.querySelector("#multi");
const DOMButtonMultbutton = document.querySelectorAll(".multbutton");
const DOMButtonNext = document.querySelector(".-next");
const DOMCheckButton = document.querySelector("#check");
const DOMButtonReset = document.querySelectorAll(".reset");
const DOMButtonCourse = document.querySelector("#newCourse");
//"Klicken Sie auf die Karte"
const DOMIntro = document.querySelector("#intro");
// Pop up
const popupFirst = document.querySelector("#popup-first");
const popupEnd = document.querySelector("#popup-round");
const PopupClose = document.querySelectorAll(".close");
// Blur HTML Elemente
const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#background");
const DOMWrapper = document.querySelector("#wrapper");
//Karte (zum drehen)
const DOMCard = document.getElementById("card");
const CardBack = document.querySelector(".card--back");
const CardFront = document.querySelector(".card--front");
//nur für Methode Multiplechoice (Rückseite der Karte färben)
const anzeige = document.querySelector(".anzeige");
const rand = document.querySelector(".index-card");
const DOMAnzeige = document.querySelector(".richtigFalsch");

//VARIABLEN UND KONSTANTEN
const curentMethode = document.querySelector(".activeMethode").innerText;
const choosedCourse = document.querySelectorAll(".ON");
const currentCard = document.getElementById("counter");
const course = document.getElementById("course");
let falseCounter = 0; //zählt wie viele Falsche der Spieler in einer Runde hat
let inx = 0;
let round = 1;
let firstArray = [];
let oddArray = []; //mod 2 = 1
let evenArray = []; //mod 2 = 0 
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
//Chart
const donutChart = document.getElementById('myChart');
const donutChartCurrent = document.getElementById('my2Chart');
let fail = 0;
let right = 0;
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

//KURSNAME BEI AUSWAHL ÄNDERN
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

//SRC FÜR DIE BILDER HOLEN
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

//ANZAHL DER STUDENTEN IN DEN KURSEN
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

//NAMEN UND BILD NUMMERN DER STUDENTEN JE KURS
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
      .set("11", "Anne-Kathrin Drotleff")
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
    case "ON17Female":
      map = new Map()
      .set("", "");
      return map;
    case "ON17Male":
      map = new Map()
      .set("", "");
      return map;
    default:
      return "Jemand hat einen Fehler gemacht";
  }
}


//ALLGEMEINE ON KLICK EVENTS
// x-Button, navigiert zur Startseite
DOMButtonReset.forEach((element) => {
   element.addEventListener("click", () => {
     saveInstancesLocal();
    });
});
DOMButtonContinue.addEventListener("click", continueGame);
DOMButtonCourse.addEventListener("click", ()=>{
  continueGame();
  saveInstancesLocal();
  firstPopUp();
});

// POPUP
function firstPopUp() {
  stopGame();
  blurElements();
  popupFirst.style.display = "block";
  let DOMH3 = popupFirst.querySelector("#test");
  DOMH3.innerHTML = `Welche Namen wollen Sie lernen? Wählen Sie einen der Kurse.`;
}

function endPopUp(p_round, p_falseCounter) {
    popupEnd.style.display = "block";
    blurElements();
    let DOMH3 = popupEnd.querySelector("#round");
    charIt();
    chart();
    percent();

  if (p_falseCounter == 0) {
    DOMH3.innerHTML = `<span class="line"></span> Super! Sie haben Runde ${p_round} ohne einen einzigen Fehler geschafft! <br>
    Wollen Sie weiter spielen oder einen neuen Kurs wählen?`;
  } else {
    DOMH3.innerHTML = `<span class="line"></span> Sie haben Runde ${p_round} geschafft! <br>
    Wollen Sie weiter spielen oder einen neuen Kurs wählen?`;
  }
}

//Funktion um Popups auszublenden
function hidePopUp() {
  DOMNav.classList.remove("blur");
  DOMBackground.classList.remove("blur");
  DOMWrapper.classList.remove("blur");

  popupFirst.style.display = "none";
  popupEnd.style.display = "none";
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
  

  if (curentMethode == "KARTEIKARTEN") {
    DOMCheckButton.style.display = "flex";
    DOMIntro.style.display = "none";
  } 
  else if (curentMethode == "MULTIPLECHOICE") {
    DOMButtonMulti.style.display = "none";
    DOMButtonNext.style.display = "flex";
    multipleKarte(event.target);
    charCurrent();
  }
}

function flipCardReverse() {
  DOMCard.classList.remove("card_hover");
  CardBack.classList.remove("display");
  CardFront.classList.add("display");

  if (curentMethode == "KARTEIKARTEN") {
    DOMCheckButton.style.display = "none";
    DOMIntro.style.display = "inline";
    charCurrent();
  } 
  else if (curentMethode == "MULTIPLECHOICE") {
    DOMButtonMulti.style.display = "flex";
    DOMButtonNext.style.display = "none";
    rand.style.border = "none";
  }
}


//hier zur initial definition aller variablen und arrays die erstellt werden müssen
function methodRW() {
  hidePopUp();
  

  DOMCard.addEventListener("click", flipCard);
  DOMButtonRight.addEventListener("click", countAndNew);
  DOMButtonFalse.addEventListener("click", displayCardUp);

  DOMIntro.style.display = "inline";
}

function methodMC() {
  hidePopUp();

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
    checkIfNewUser(event.target);
    
  });
});

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
  if(curentMethode == "MULTIPLECHOICE"){
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
    endPopUp(round, falseCounter);
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

  if (curentMethode == "KARTEIKARTEN"){
    countAndNew();
    num = arr[inx - 1];
  }
  else if (curentMethode == "MULTIPLECHOICE"){
    num = arr[inx];
  }
    
  if (round == 1) {
    if (!evenArray.includes(num)) {
      evenArray.push(num,num);
    }
  } else if (round % 2 == 1) {
    if (!evenArray.includes(num)) {
      evenArray.push(num,num);
    }
  } else if (round % 2 == 0) {
    if (!oddArray.includes(num)) {
      oddArray.push(num);
    }
  }
  console.log(evenArray);
}

// Arrays werden geändert und geshuffelt
function continueGame() {

  if (falseCounter == 0){
    round = 0;
  }
  else if (round == 1) {
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
  firstArray.length = [];
  oddArray.length = [];
  evenArray.length = [];

  inx = 0;
  round = 1;
  falseCounter = 0;
}

//MULTIPLECHOICE RANDOM NAMEN
async function getName(stringNumber){

  if (mapFemale.has(`${stringNumber}`)){
    arrayGender = arrayFemale;
    mapGender = mapFemale;
    nameRichtig = mapFemale.get(`${stringNumber}`);
    
    randomName1 = await getRandomName(arrayGender, mapGender);
    randomName2 = getRandomName2(arrayGender, mapGender, randomName1);
  
  }
  else if (mapMale.has(`${stringNumber}`)){
    arrayGender = arrayMale;
    mapGender = mapMale;
    nameRichtig = mapMale.get(`${stringNumber}`);

    randomName1 = await getRandomName(arrayGender, mapGender);
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

//KARTE DREHT SICH:
function multipleKarte(target) {
  let name = target.innerHTML;
  if (name == nameRichtig) {
    anzeige.innerHTML = "Super, richtig!";
    anzeige.style.color = '#88BC48';
    rand.style.border = 'solid 3px #88BC48';
    successSound();
  } 
  else {
    anzeige.innerHTML = "Das war leider falsch.";
    anzeige.style.color = 'salmon';
    rand.style.border = 'solid 3px salmon';
    displayCardUp();
    failSound()
  }
}

/*Sound*/
function successSound(){
  let audio = document.getElementById('success');
  audio.play();
}

function failSound(){
  let audio = document.getElementById('fail');
  audio.play();
}

/* Trefferquote - Chart */
function charCurrent(){
  
  let currentFail = falseCounter
  let currentRight;

  if (curentMethode == "MULTIPLECHOICE"){
     currentRight = (inx + 1) - currentFail;
  }
  else if (curentMethode=="KARTEIKARTEN"){
    currentRight = (inx) - currentFail;
  }
  
  const chartTest = new Chart(donutChartCurrent, {
    type: 'doughnut',
    data: {
      labels: ['Richtig', 'Falsch'],
      datasets: [{
        label: 'Trefferquote',
        backgroundColor: ['#88bc48', 'salmon'],
        data: [[currentRight], [currentFail]]
      }]
    },

    options: {
      cutoutPercentage: 65,
      animation: {
        animateScale: true
      },
      legend: {
        display: false
      },
    }
  })
}
function charIt() {
  fail = falseCounter;

  right = getStudents() - fail;


  const chartTest = new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: ['Richtig', 'Falsch'],
      datasets: [{
        label: 'Trefferquote',
        backgroundColor: ['#88bc48', 'salmon'],
        data: [[right], [fail]]
      }]
    },

    options: {
      cutoutPercentage: 65,
      animation: {
        animateScale: true
      },
      legend: {
        display: false
      },
    }
  })
};


function chart() {
  charIt();
};


function percent () {

  fail = falseCounter;
  right = inx - fail;

  let rechnung = Math.round (right/inx*100);

  const perc = document.getElementById("prozent");

  perc.innerHTML = rechnung + "%";
}


//Storage
function checkIfNewUser(courseName){
  console.log('MapFemale', mapFemale);
  let session = 'session' + courseName.innerHTML + curentMethode;
  let number = localStorage.getItem(session);
  let storageValue = parseInt(number);
  console.log(storageValue);

  if(storageValue==0){
    localStorage.setItem(session, '1');
    if(curentMethode == "KARTEIKARTEN"){
      createArrayRW();
      methodRW();
    }
    else if(curentMethode == "MULTIPLECHOICE"){
      createArrayMC();
      methodMC();
      showImages();
    }
    console.log('erstes mal');
  }else if(storageValue==1){
    console.log( JSON.stringify(localStorage, null, 2) );
    getInstancesLocal(courseName);
    console.log(firstArray);
    if(curentMethode == "KARTEIKARTEN"){
      showImages();
      methodRW();
    }
    else if(curentMethode == "MULTIPLECHOICE"){

      mapFemale = getStudentMap(`${course.innerHTML}Female`);
      mapMale = getStudentMap(`${course.innerHTML}Male`);

      methodMC();
      showImages();
    }
    console.log('erneutes mal');
  }else if(!storageValue){
    localStorage.setItem(session, '1');
    if(curentMethode == "KARTEIKARTEN"){
      createArrayRW();
      methodRW();
    }
    else if(curentMethode == "MULTIPLECHOICE"){
      createArrayMC();
      methodMC();
      showImages();
    }
  }
}
//Instanzen des jeweiligen Kurses speichern
function saveInstancesLocal(){
  const courseTest = document.getElementById("course").innerHTML;
  const currentMethode = document.querySelector(".activeMethode").innerText;

  let sFalseCounter = `falseCounter${courseTest}${currentMethode}`;
  localStorage.setItem(sFalseCounter, falseCounter);

  let sInx = `inx${courseTest}${currentMethode}`;
  localStorage.setItem(sInx, inx);

  let sRound = `round${courseTest}${currentMethode}`;
  localStorage.setItem(sRound, round);

  let sFirstArray = `firstArray${courseTest}${currentMethode}`;
  localStorage.setObj(sFirstArray, firstArray);

  let sOddArray = `oddArray${courseTest}${currentMethode}`;
  localStorage.setObj(sOddArray, oddArray);

  let sEvenArray = `evenArray${courseTest}${currentMethode}`;
  localStorage.setObj(sEvenArray, evenArray);

  let sSession = `session${courseTest}${currentMethode}`;
  let number = localStorage.getItem(sSession);
  localStorage.setItem(sSession, number);

  if (curentMethode === 'MULTIPLECHOICE') {
    let sArrayMale = `arrayMale${courseTest}${currentMethode}`;
    localStorage.setObj(sArrayMale, arrayMale);

    let sArrayFemale = `arrayFemale${courseTest}${currentMethode}`;
    localStorage.setObj(sArrayFemale, arrayFemale);
  } 
  stopGame();
}
//Fortschritt löschen
function clearStorageCourse(){
  let courseName = course.innerHTML;
  let session = 'session' + courseName + curentMethode;
  localStorage.removeItem(session);
  
  let sFalseCounter = `falseCounter${courseName}${curentMethode}`;
  localStorage.removeItem(sFalseCounter);
  
  let sInx = `inx${courseName}${curentMethode}`;
  localStorage.removeItem(sInx);
  
  let sRound = `round${courseName}${curentMethode}`;
  localStorage.removeItem(sRound);
  
  let sFirstArray = `firstArray${courseName}${curentMethode}`;
  localStorage.removeItem(sFirstArray);
  
  let sOddArray = `oddArray${courseName}${curentMethode}`;
  localStorage.removeItem(sOddArray);
  
  let sEvenArray = `evenArray${courseName}${curentMethode}`;
  localStorage.removeItem(sEvenArray);

  if (curentMethode === 'MULTIPLECHOICE') {
    let sArrayMale = `arrayMale${courseTest}${currentMethode}`;
    localStorage.removeItem(sArrayMale);

    let sArrayFemale = `arrayFemale${courseTest}${currentMethode}`;
    localStorage.removeItem(sArrayFemale);
  } 
}

function clearStorage(){
  localStorage.clear();
}
//Instanzen des jeweiligen Kurses
function getInstancesLocal(courseName){
  const courseTest = document.getElementById("course").innerHTML || courseName.innerHTML;
  const currentMethode = document.querySelector(".activeMethode").innerText;

  let sFalseCounter = `falseCounter${courseTest}${currentMethode}`;
  console.log(sFalseCounter);
  falseCounter = Number(localStorage.getItem(sFalseCounter));

  let sInx = `inx${courseTest}${currentMethode}`;
  inx = Number(localStorage.getItem(sInx));

  let sRound = `round${courseTest}${currentMethode}`;
  round = Number(localStorage.getItem(sRound));

  let sFirstArray = `firstArray${courseTest}${currentMethode}`;
  firstArray = localStorage.getObj(sFirstArray);

  let sOddArray = `oddArray${courseTest}${currentMethode}`;
  oddArray = localStorage.getObj(sOddArray);

  let sEvenArray = `evenArray${courseTest}${currentMethode}`;
  evenArray = localStorage.getObj(sEvenArray);
  
  if (curentMethode === 'MULTIPLECHOICE') {
    let sArrayMale = `arrayMale${courseTest}${currentMethode}`;
    arrayMale = localStorage.getObj(sArrayMale);

    let sArrayFemale = `arrayFemale${courseTest}${currentMethode}`;
    arrayFemale = localStorage.getObj(sArrayFemale);
  }
  //clearStorage();
}
