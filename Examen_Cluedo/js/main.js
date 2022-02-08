//Boudier Théo | utiliser mode strict
"use strict";
//Charger les selects au chargement de la page
const suspectsSelect = document.querySelector("#suspects");
const weaponsSelect = document.querySelector("#weapons");
const roomsSelect = document.querySelector("#rooms");

function populateSelects(datas, suspectsSelect, weaponsSelect, roomsSelect) {
    datas.suspects.map((suspect, index) => suspectsSelect.insertAdjacentHTML('beforeend', `<option value=${index}>${suspect}</option>`))
    datas.weapons.map((weapon, index) => weaponsSelect.insertAdjacentHTML('beforeend', `<option value=${index}>${weapon}</option>`))
    datas.rooms.map((room, index) => roomsSelect.insertAdjacentHTML('beforeend', `<option value=${index}>${room}</option>`))
}
window.addEventListener('onload', populateSelects(datas, suspectsSelect, weaponsSelect, roomsSelect))
//Gestion du résultat - /6

//Optimisation (bien organisé) - /4 

//Nom des variables - /1

//Comentaires - /3

