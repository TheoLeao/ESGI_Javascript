const getWeather = async (city) => {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
        return await response.json();
    } catch (err) { console.log('Fetch error:' + err); }
}
const apiKey = "ef0e3733aca1640a9bfe3ba62de7b939";
const [cityInput, button, stringCity, stringTemp, article, stringInfo, img] = [document.querySelector('#ville'), document.querySelector('#submit'), document.querySelector('body > article > h2 > strong'), document.querySelector('body > article > p > strong'), document.querySelector('body > article'), document.querySelector('body > article > div > small'), document.querySelector('body > article > div > img')];
button.addEventListener('click', async () => {
    let data = await getWeather(cityInput.value);
    stringCity.innerHTML = data.name;
    stringTemp.innerHTML = data.main.temp;
    stringInfo.innerHTML = data.weather[0].description;
    img.src = `img/${data.weather[0].icon}.png`;
    article.classList.remove('hide');
})