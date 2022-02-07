import AJAX from "./class/ajax.js";
import Discussion from "./class/discussion.js";
import LocalStorage from "./class/localstorage.js";


const ajax = new AJAX();
const discussion = new Discussion();
const ls = new LocalStorage("chatbox");

const CHATBOX = JSON.parse(localStorage.getItem('CHATBOX'));

const storage = {
    empty: "Merci de saisir quelque chose.",
    join: "Cette discussion n'existe pas.",
    create: "Cette discussion existe déjà.",
};

async function AddMessages() {

    const message = document.querySelector("#contenu").value;
    const params = { id: CHATBOX.id, msg: message, pseudo: CHATBOX.pseudo };

    await ajax.post("addMessage", { id: CHATBOX.id, msg: message, pseudo: CHATBOX.pseudo });
    
    
}

async function GetMessages() {

    const messages = await ajax.post("getMessages", { id: CHATBOX.id });
    
    
    messages.forEach(message => {

        document.querySelector("#messages").innerHTML += `<div class="bulle"> <p class="content"> ${message.Contenu}</p> </div> ` ;
        
    });

    //console.log(messages[0].Contenu);
    //document.querySelector("#messages").innerHTML += 
    
    
}

async function showInfos() {

    discussion.from(ls.loadDatas());
    document.querySelector("#pseudo").textContent = discussion.pseudo

    const name = await discussion.getName(ajax);
    document.querySelector("#saisie h2 span").textContent = name;

    
}

GetMessages();
showInfos();
document
    .querySelector("#submit")
    .addEventListener("click", AddMessages);