//Boudier Théo | utiliser mode strict
"use strict";
/* 
    UTILS
*/

function getRandomItemFromArray(array) { return array[Math.floor(Math.random() * array.length)] };

//Retrieve dom elements 
const [suspectsSelect, weaponsSelect, roomsSelect, chargeButton] = [document.querySelector("#suspects"), document.querySelector("#weapons"), document.querySelector("#rooms"), document.querySelector("#accusation")]
//Populate selects on window load
function populateSelects(datas, suspectsSelect, weaponsSelect, roomsSelect) {
    datas.suspects.map((suspect, index) => suspectsSelect.insertAdjacentHTML('beforeend', `<option value=${index}>${suspect}</option>`))
    datas.weapons.map((weapon, index) => weaponsSelect.insertAdjacentHTML('beforeend', `<option value=${index}>${weapon}</option>`))
    datas.rooms.map((room, index) => roomsSelect.insertAdjacentHTML('beforeend', `<option value=${index}>${room}</option>`))
}
function getRandomCoupable(datas) {
    return {
        name: getRandomItemFromArray(datas.suspects),
        weapon: getRandomItemFromArray(datas.weapons),
        room: getRandomItemFromArray(datas.rooms)
    }
}
console.log(getRandomCoupable(datas))

//Main
window.addEventListener('onload', populateSelects(datas, suspectsSelect, weaponsSelect, roomsSelect))
//Gestion du résultat - /6

//Optimisation (bien organisé) - /4 

//Nom des variables - /1

//Comentaires - /3

