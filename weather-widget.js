
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
// const myTown = document.querySelector(#town);

const apiKey = '44ae607418dabba6d4ab9a291f2a6ce0'
const trierLat = "49.75"
const trierLong = "6.64"

const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    console.log("hello")
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${trierLat}&lon=${trierLong}&units=imperial&appid=${apiKey}`;

    weatherIcon.setAttribute('src', iconsrc)
    weatherIcon.setAttribute('alt', data.weather[0].description)
    captionDesc.textContent = data.weather[0].description;

}

apiFetch();