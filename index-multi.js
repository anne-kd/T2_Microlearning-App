multipleKarte(event.target);
const anzeige = document.querySelector(".anzeige");
const rand = document.querySelector(".card--back");
const DOMAnzeige = document.querySelector(".richtigFalsch");

function multipleKarte(target) {
  let name = target.innerHTML;
  console.log(name);
if (name == "Steffen Brendle") {
  DOMAnzeige.style.display = "block";
  anzeige.innerHTML = "richtig";
  anzeige.style.color = 'green';
  rand.style.border = 'solid 3px green';
} 
else {
  DOMAnzeige.style.display = "block";
  anzeige.innerHTML = "falsch";
  anzeige.style.color = 'red';
  rand.style.border = 'solid 3px red';
}
}

