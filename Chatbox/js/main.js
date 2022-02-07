import AJAX from "./class/ajax.js";
import Discussion from "./class/discussion.js";
import LocalStorage from "./class/localstorage.js";

const ajax = new AJAX();
const discussion = new Discussion();
const ls = new LocalStorage("chatbox");

const errorMessages = {
    empty: "Merci de saisir quelque chose.",
    join: "Cette discussion n'existe pas.",
    create: "Cette discussion existe déjà.",
};



function toggle(selector){
    document.querySelector(selector).classList.toggle("hide");
}

async function createOrJoinDiscussion() {
    const action = this.dataset.action;
    const name = document.querySelector("#" + action + " input").value;
    if (check(name)) {
        const datas = await ajax.post(action, { id: name });
        if (datas.discussion == false) {
            showError("#" + action, errorMessages[action]);
        } else {
            discussion.name = name;
            discussion.id = parseInt(datas.discussion);
            toggle("#" + action);
            toggle("#pseudo");
        }
    } else {
        showError("#" + action, errorMessages.empty);
    }
}

function getPseudo() {
    const pseudo = document.querySelector("#pseudo input").value;
    if (check(pseudo)){
        discussion.pseudo = pseudo;
        ls.saveDatas(discussion);
        window.location = "chat.html"
    }
    else{
        showError("#pseudo", errorMessages.empty);
    }
}


function check(value){
    
    return value.trim().length > 0;
}

function showError(selector, error){
    const alert = document.querySelector(".alert");
    alert != null && alert.remove();
    document.querySelector(selector).insertAdjacentHTML(
        "afterbegin",
        `<div class="alert alert-warning" role="alert">
        ${error}
        </div>`
    );
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#join a, #create a").forEach((a) =>
    a.addEventListener("click", () => {
        toggle("#join");
        toggle("#create");
    }))
})

document
    .querySelector(`[data-action="create"]`)
    .addEventListener("click", createOrJoinDiscussion);
document
.querySelector(`[data-action="join"]`)
.addEventListener("click", createOrJoinDiscussion);
document
.querySelector(`[data-action="pseudo"]`)
.addEventListener("click", getPseudo);