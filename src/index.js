//add current time

let now = new Date();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentDate = document.querySelector(".dateTime");
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

//display city name

function cityDisplay(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#citySearch");
  console.log(searchBar.value);
  let cityHeading = document.querySelector("#cityHeader");
  cityHeading.innerHTML = searchBar.value;
}

function apiSearch(response) {
  let key = "3ec119a7b4622feedeeba843b106eb0a";
  let searchBar = document.querySelector("#citySearch");
  let city = searchBar.value;
  console.log(city.value);
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(urlAPI).then(weather);
}

function weather(response) {
  let cityWeather = document.querySelector("#temperature");
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  cityWeather.innerHTML = `${temperature} °C`;
  let cityDescription = document.querySelector("#descriptor");
  console.log(response.data.weather[0].description);
  cityDescription.innerHTML = response.data.weather[0].description;
  let apparentTemp = document.querySelector("#feels");
  let feelTemp = Math.round(response.data.main.feels_like);
  apparentTemp.innerHTML = `Apparent temperature: Feels like ${feelTemp}°C`;
  let humidity = document.querySelector("#humidity");
  let humidityPercent = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humidityPercent}%`;
  let windSpeed = document.querySelector("#windspeed");
  let windSpeedms = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind speed ${windSpeedms} m/s`;
  let icon = response.data.weather[0].icon;
  let iconDisplay = document.querySelector("#icon--today");
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  function funits(event) {
    event.preventDefault();
    let unitsTemp = document.querySelector("#temperature");
    console.log(temperature.value);
    let calculate = Math.round(temperature * (9 / 5) + 32);
    unitsTemp.innerHTML = `${calculate}°F`;
    let apparentFaren = Math.round(feelTemp * (9 / 5) + 32);
    apparentTemp.innerHTML = `Apparent temperature: Feels like ${apparentFaren}°F`;
  }

  let clickUnitF = document.querySelector("#unit-id-faren");
  clickUnitF.addEventListener("click", funits);

  let clickUnitC = document.querySelector("#unit-id-cel");
  clickUnitC.addEventListener("click", apiSearch);
}

let form = document.querySelector("#search");
form.addEventListener("submit", cityDisplay);
form.addEventListener("submit", apiSearch);

function handlePosition(position) {
  function weather(response) {
    let cityHeading = document.querySelector("#cityHeader");
    cityHeading.innerHTML = response.data.name;
    let cityWeather = document.querySelector("#temperature");
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    cityWeather.innerHTML = `${temperature} °C`;
    let cityDescription = document.querySelector("#descriptor");
    console.log(response.data.weather[0].description);
    cityDescription.innerHTML = response.data.weather[0].description;
    let apparentTemp = document.querySelector("#feels");
    let feelTemp = Math.round(response.data.main.feels_like);
    apparentTemp.innerHTML = `Apparent temperature: Feels like ${feelTemp}°C`;
    let humidity = document.querySelector("#humidity");
    let humidityPercent = response.data.main.humidity;
    humidity.innerHTML = `Humidity: ${humidityPercent}%`;
    let windSpeed = document.querySelector("#windspeed");
    let windSpeedms = Math.round(response.data.wind.speed);
    windSpeed.innerHTML = `Wind speed ${windSpeedms} m/s`;
    let icon = response.data.weather[0].icon;
    let iconDisplay = document.querySelector("#icon--today");
    iconDisplay.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );

    function funits(event) {
      event.preventDefault();
      let unitsTemp = document.querySelector("#temperature");
      console.log(temperature.value);
      let calculate = Math.round(temperature * (9 / 5) + 32);
      unitsTemp.innerHTML = `${calculate}°F`;
      let apparentFaren = Math.round(feelTemp * (9 / 5) + 32);
      apparentTemp.innerHTML = `Apparent temperature: Feels like ${apparentFaren}°F`;
    }

    let clickUnitF = document.querySelector("#unit-id-faren");
    clickUnitF.addEventListener("click", funits);

    let clickUnitC = document.querySelector("#unit-id-cel");
    clickUnitC.addEventListener("click", apiSearch);
  }

  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "3ec119a7b4622feedeeba843b106eb0a";
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(urlAPI).then(weather);
}

navigator.geolocation.getCurrentPosition(handlePosition);
