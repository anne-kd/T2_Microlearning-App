const DOMButtonOnboard = document.querySelector("#onboardButton");
const DOMButtonClose = document.querySelector(".onboardexit");
const DOMOnboardPopup = document.querySelector("#PopUpOnboarding");
const DOMNavi = document.querySelector("nav");
const DOMBgImg = document.querySelector("#bg-img");
const DOMContainer = document.querySelector("#container");
const DOMLogos = document.querySelector("#logobox");
const DOMBody = document.querySelector("body");

DOMButtonOnboard.addEventListener("click", ()=>{
    DOMOnboardPopup.style.display = "block";
    DOMNavi.classList.add("blur");
    DOMBgImg.classList.add("blur");
    DOMContainer.classList.add("blur");
    DOMLogos.classList.add("blur");
    DOMBody.classList.add("body");
});
DOMButtonClose.addEventListener("click", ()=>{
    DOMOnboardPopup.style.display = "none";
    DOMNavi.classList.remove("blur");
    DOMBgImg.classList.remove("blur");
    DOMContainer.classList.remove("blur");
    DOMLogos.classList.remove("blur");
    DOMBody.classList.remove("body");
});