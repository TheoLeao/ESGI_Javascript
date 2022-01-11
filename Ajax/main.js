const target = document.querySelector('#target');
const inputGetHtmlData = document.querySelector('#get-html-data');
const runButton = document.querySelector('#run');
async function getHtmlArticle() {
    try {
        let response = await fetch('./data/1-get-html-article.html');
        return await response.text()
    } catch (err) {  console.log('Fetch error:' + err); }
}
async function getHtmlMovies() {
    try {
        let response = await fetch('./data/3-get-html-movies.html');
        return await response.text();
    } catch (err) { console.log('Fetch error:' + err); }
}
async function getContactsList() {
    try {
        let response = await fetch('./data/2-get-contacts-list.json');
        return await response.json()
    } catch (err) { console.log('Fetch error:' + err); }
}
async function getJsonMovies() {
    try {
        let response = await fetch('./data/4-get-json-movies.json');
        return await response.json();
    } catch (err) { console.log('Fetch error:' + err); }
}
function injectHtml(target, data) {
    target.innerHTML = data
}
function showContact(data) {
    target.innerHTML = data.map((contact) => `<p>Prénom: ${contact.firstName}</p><p>Phone: ${contact.phone}</p>`).join('');
}
function showFilms(data) {
    target.innerHTML = `<ul class="movie-list"> ${data.map((film) => `<li><img src="images/${film.cover}"><p><strong>${film.title}</strong> - <em>${film.duration}</em></p></li>`).join('')} </ul>`;
}
runButton.addEventListener('click', async () => {
    let value = parseInt(document.querySelector('input[name="what"]:checked').value);
    value === 1 ? injectHtml(target, await getHtmlArticle()) : value === 2 ? showContact(await getContactsList()) : value === 3 ? injectHtml(target, await getHtmlMovies()) : value === 4 ? showFilms(await getJsonMovies()) : 'error';
})