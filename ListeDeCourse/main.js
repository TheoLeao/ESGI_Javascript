const [addButton, input, deleteOneButton, deleteAllButton, list, enumUpdateListActions, listTitle] = [document.querySelector('#submit'), document.querySelector('#toAdd'), document.querySelector('#deleteOne'), document.querySelector('#delete'), document.querySelector('.list'), { addToList: 'addToList', deleteOneItem: 'deleteOneItem' }, document.querySelector('body > section:nth-child(3) > h2')];
function createLiNodeWithText(text) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    return li;
}
const renderList = () => {
    listTitle.innerHTML = `La liste contient ${shoppingList.length} produit(s)`;
    list.innerHTML = ``;
    shoppingList.map((item) => { list.appendChild(createLiNodeWithText(item)); })
}
let shoppingList = [];
shoppingList.updateList = function (action, payload) {
    action === enumUpdateListActions.addToList ? list.appendChild(createLiNodeWithText(payload.value)) && shoppingList.push(payload.value) : action === enumUpdateListActions.deleteOneItem ? shoppingList.includes(payload.value) && shoppingList.splice(shoppingList.indexOf(payload.value), 1) : '';
    renderList();
}
let togglePopup = () => document.querySelector('#popup').classList.toggle("hide");
addButton.addEventListener('click', () => input.value && shoppingList.updateList(enumUpdateListActions.addToList, { value: input.value }))
deleteOneButton.addEventListener('click', async () => {
    togglePopup();
    document.querySelector('#btnDelete').addEventListener('click', () => {
        shoppingList.updateList(enumUpdateListActions.deleteOneItem, { value: document.querySelector('#toDelete').value })
    })

})
document.querySelector('#popup > h3 > span').addEventListener('click', () => togglePopup())
deleteAllButton.addEventListener('click', () => list.innerHTML = '')