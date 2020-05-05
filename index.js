
// x-Button
const DOMButtonExit = document.querySelectorAll(".close");
DOMButtonExit.forEach((element) => {
  element.addEventListener("click", hidePopUp);
});

const Popuponboarding = document.querySelector("#PopUpOnboarding");

const DOMNav = document.querySelector("nav");
const DOMBackground = document.querySelector("#bg-img");
const DOMWrapper = document.querySelector("#container");
const DOMOnboardButton = document.querySelector("#onboardButton")

function onboardingPopUp(){
  blurElements();
  Popuponboarding.style.display = "block";
}

DOMOnboardButton.addEventListener("click", onboardingPopUp);

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