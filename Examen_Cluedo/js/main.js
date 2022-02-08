//Boudier Théo
"use strict";

/* 
    CONSTANTS
*/
const [suspectsSelect, weaponsSelect, roomsSelect, chargeButton, form] = [document.querySelector("#suspects"), document.querySelector("#weapons"), document.querySelector("#rooms"), document.querySelector("#accusation"), document.querySelector('body > form')]


/*
    FUNCTIONS
*/

/** Randomly returns an element of an array
 * @param { Object } datas
 * @param { HTMLElement } suspectsSelect
 * @param { HTMLElement } weaponsSelect
 * @param { HTMLElement } roomsSelect
 * @return { Object }
 */
function getRandomItemFromArray(array) { return array[Math.floor(Math.random() * array.length)] };

/** Populate selects
 * @param { Object } datas
 * @param { HTMLElement } suspectsSelect
 * @param { HTMLElement } weaponsSelect
 * @param { HTMLElement } roomsSelect
 * @return { Object }
 */
function populateSelects(datas, suspectsSelect, weaponsSelect, roomsSelect) {
    datas.suspects.map((suspect, index) => suspectsSelect.insertAdjacentHTML('beforeend', `<option value=${index}>${suspect}</option>`))
    datas.weapons.map((weapon, index) => weaponsSelect.insertAdjacentHTML('beforeend', `<option value=${index}>${weapon}</option>`))
    datas.rooms.map((room, index) => roomsSelect.insertAdjacentHTML('beforeend', `<option value=${index}>${room}</option>`))
}

/** Returns randomly the name of a coupable, a weapon and a room
 * @param { Object } datas
 * @return { Object }
 */
function getRandomCoupable(datas) {
    return { name: getRandomItemFromArray(datas.suspects), weapon: getRandomItemFromArray(datas.weapons), room: getRandomItemFromArray(datas.rooms) }
}

/** Returns the result of the user inputs
 * @param { Object } datas
 * @return { Object }
 */
function getFormDatas(datas) {
    let [nameIndex, weaponIndex, roomIndex] = [document.querySelector('#suspects').value, document.querySelector('#weapons').value, document.querySelector('#rooms').value]
    return { name: datas.suspects[nameIndex], weapon: datas.weapons[weaponIndex], room: datas.rooms[roomIndex] }
}

/** Returns the result of the user inputs
 * @param { Object } coupable
 * @param { Object } formDatas
 * @return { Object }
 */
function chargeResult(coupable, formDatas) {
    return { name: coupable.name === formDatas.name, weapon: coupable.weapon === formDatas.weapon, room: coupable.room === formDatas.room }
}

/*
    MAIN CODE
*/

//populate select on window load
window.addEventListener('onload', populateSelects(datas, suspectsSelect, weaponsSelect, roomsSelect))

chargeButton.addEventListener('click', () => {
    let coupable = getRandomCoupable(datas);
    let formDatas = getFormDatas(datas);
    let result = chargeResult(coupable, formDatas);
    let isWin = result.name && result.weapon && result.room;
    //show result to user
    document.body.insertAdjacentHTML('beforeend', `<p>Vous accusez <b>${formDatas.name}</b> d'avoir tué le Docteur Lenoir avec la/le ${formDatas.weapon} dans la/le ${formDatas.room}</p>`);
    document.body.insertAdjacentHTML('beforeend', `
    <table>
        <thead>
            <tr>
                <td>Coupable</td>
                <td>Arme</td>
                <td>Pièce</td>
                </tr>
        </thead>
        <tbody>
            <tr>
                <td>${formDatas.name}</td>
                <td>${formDatas.weapon}</td>
                <td>${formDatas.room}</td>
            </tr>
            <tr>
                <td>${result.name ? '✅' : '❌'}</td>
                <td>${result.weapon ? '✅' : '❌'}</td>
                <td>${result.room ? '✅' : '❌'}</td>
            </tr>
        </tbody>
    </table>
    `);
    document.body.insertAdjacentHTML('beforeend', `<p>${isWin ? '<b>Bravo !</b>' : '<b>Et c\'est raté !</b>'} C'est <b>${coupable.name}</b> qui a tué le docteur Lenoir avec la/le ${coupable.weapon} dans la/le ${coupable.room}</p>`);
    //do not show the form anymore
    form.style.display = 'none';
})