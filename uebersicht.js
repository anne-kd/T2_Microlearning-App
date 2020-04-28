//Wechsel der Kurse in der Übersichtsseite 

const uebersichtImages = document.querySelectorAll('.student');
const uebersichtButtons = document.querySelectorAll('#On');


uebersichtButtons.forEach(element=>{
  element.addEventListener('click', (event)=>{
    let courseUebersicht = event.target.innerHTML;
    for(let i =0;i<uebersichtImages.length;i++){
        if(i<getAmountOfImages(courseUebersicht)){
            uebersichtImages.item(i).firstChild.src = `assets/${courseUebersicht}/back/${i+1}-rs.png`;
        }else{
            uebersichtImages.item(i).firstChild.src = '';
        }
    }
  })
})

function getAmountOfImages(course){
    switch(course){
        case 'ON19':
            return 31;
        case 'ON18':
            return 7;
        case 'ON17':
            return 0;
        default:
            return 'Mengenfehler';
    }
}