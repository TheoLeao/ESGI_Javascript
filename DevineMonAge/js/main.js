async function getData(name) {
    try {
        let response = await fetch(`https://api.agify.io?name=${name}`);
        return await response.json()
    } catch (err) { console.log('Fetch error:' + err); }
}
const [validateButton,article,strongNode, h1]   = [document.querySelector('#submit'), document.querySelector('body > article'), document.querySelector('body > article > p > strong'), document.querySelector('h2')];
validateButton.addEventListener('click', async () => {
    let firstname = document.querySelector('#firstname');
    let data = await getData(firstname.value);
    article.classList.remove('hide');
    if (data.age !== null) {
        strongNode.innerHTML = data.count;
        h1.innerHTML = `D'après Agify avec le prénom ${data.name}, tu as ${data.age} ans`;
    } else {
        strongNode.innerHTML = 0;
        h1.innerHTML = `Information inconnue, désolé`
    }
})