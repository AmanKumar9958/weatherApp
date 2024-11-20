document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const weatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errorMsg = document.getElementById('error-msg');
    const minTemp = document.getElementById('min-temp');
    const maxTemp = document.getElementById('max-temp');
    const windSpeed = document.getElementById('wind-speed');
    const weatherImages = document.getElementById('weather-image');

    const API_KEY = "0db52a65a8e65b6e9c26a41e09bf6b92";

    // on enter key..
    cityInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
            weatherBtn.click();
        }
    })

    weatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();    // storing city name..
        if(city == '') return city;

        // always remember web request may throw some error..
        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error){
            showError();
        }
    })

    // get weather data
    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found!!");
        }
        const data = await response.json();
        return data;
    }
    // display weather data
    function displayWeatherData(weatherData){
        const {name, main, weather, wind} = weatherData;
        console.log(weatherData)
        cityName.textContent = name;
        temperature.textContent = `${main.temp}°C`;
        description.textContent = weather[0].description;
        if (main.temp_min === main.temp_max) {
            minTemp.textContent = `Min/Max: ${main.temp}°C`;
            maxTemp.classList.add('hidden')
        } else {
            minTemp.textContent = `Min: ${main.temp_min}°C`;
            maxTemp.textContent = `Max: ${main.temp_max}°C`;
            maxTemp.classList.remove('hidden');
        }
        windSpeed.textContent = `${wind.speed}m/s`;

        // images according to weather type..
        const icon = weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
        weatherImages.src = iconUrl;
        weatherImages.alt = weather[0].description;

        weatherInfo.classList.remove("hidden");
        errorMsg.classList.add('hidden');
        cityInput.value = "";
    }
    function showError(){
        weatherInfo.classList.add('hidden');
        errorMsg.classList.remove('hidden');

        setTimeout(() => {
            errorMsg.classList.add('hidden');
        }, 3000);

        cityName.textContent = "-------";
        temperature.textContent = "-----";
        description.textContent = "------";
        minTemp.textContent = "------";
        maxTemp.textContent = "------";
        weatherImages.src = `images/cloudy.png`;
        cityInput.value = '';
    }
})