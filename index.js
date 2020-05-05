
// x-Button
const DOMButtonExit = document.querySelectorAll(".close");
DOMButtonExit.forEach((element) => {
  element.addEventListener("click", hidePopUp);
});

const Popuponboarding = document.querySelector("#PopUpOnboarding");

const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#bg-img");
const DOMWrapper = document.querySelector("#container");

function onboardingPopUp(){
  blurElements();
  Popuponboarding.style.display = "block";
<<<<<<< HEAD
  DOMPopupClose.addEventListener("click", hidePopUp);
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
  } 
  else {
    popupRound.style.display = "block";
    blurElements();
    let DOMH3 = popupRound.querySelector("#round");
    DOMH3.innerHTML = "";
    DOMH3.innerHTML = `Sie haben Runde ${p_round} geschafft!`;
  }
}
=======
}

window.addEventListener("load", onboardingPopUp);

>>>>>>> eecc988eadb9b922f120b979898c75344833a05d
//Funktion um Popups auszublenden
function hidePopUp() {
  DOMNav.classList.remove("blur");
  DOMBackground.classList.remove("blur");
  DOMWrapper.classList.remove("blur");
  Popuponboarding.style.display="none";
}

//Funktion bei Popup Einblendung 
function blurElements() {
  DOMNav.classList.add("blur");
  DOMBackground.classList.add("blur");
  DOMWrapper.classList.add("blur");
}

