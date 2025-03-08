document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    const API_KEY = '3f95eea850912bbdefd4263769a6e987';

    getWeatherBtn.addEventListener('click', async function() {
        const city = cityInput.value.trim();
        if(!city) return;
        
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error) {
            showError();
        }

    })

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if(!response.ok) throw new Error("City not found");
        const data = await response.json();
        return data;
    }

    function displayWeatherData(weatherData) {
        const {name, main, weather} = weatherData;
        cityName.textContent = name;
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        temperature.textContent = `Temperature: ${main.temp}°C`;
        weatherDescription.textContent = `Weather: ${weather[0].description}`;
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }

});