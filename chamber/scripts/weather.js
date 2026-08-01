// OpenWeatherMap API details
const apiKey = '44ae607418dabba6d4ab9a291f2a6ce0';
const lat = '6.45';
const lon = '3.43';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// DOM elements
const weatherLocation = document.querySelector('#weather-location');
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const windSpeed = document.querySelector('#wind-speed');
const windChill = document.querySelector('#wind-chill');

// Fetch weather data
async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

// Display results in HTML
function displayResults(data) {
    // Set City Name
    if (weatherLocation) {
        weatherLocation.textContent = data.name; // Displays "Lagos"
    }

    const temp = Math.round(data.main.temp);
    const speed = Math.round(data.wind.speed);

    if (currentTemp) currentTemp.textContent = temp;
    if (windSpeed) windSpeed.textContent = speed;

    const desc = data.weather[0].description;
    if (weatherDesc) {
        weatherDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    }

    if (weatherIcon) {
        const iconCode = data.weather[0].icon;
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
        weatherIcon.setAttribute('alt', desc);
    }

    if (windChill) {
        windChill.textContent = calculateWindChill(temp, speed);
    }
}

// Wind chill calculation function
function calculateWindChill(temp, speed) {
    if (temp <= 50 && speed > 3.0) {
        const chill = 35.74 + (0.6215 * temp) - (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temp * Math.pow(speed, 0.16));
        return `${Math.round(chill)}°F`;
    } else {
        return 'N/A';
    }
}

apiFetch();