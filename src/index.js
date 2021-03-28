//add current time

let now = new Date();
let minutes = now.getMinutes();
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

//add city name after search

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
  cityWeather.innerHTML = `${temperature}`;
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
}
//put in and icon (API codes already)
//  http://openweathermap.org/img/wn/10d@2x.png

let form = document.querySelector("#search");
form.addEventListener("submit", cityDisplay);
form.addEventListener("submit", apiSearch);

//display city weather using API

//api.openweathermap.org/data/2.5/weather?q=canberra&appid=3ec119a7b4622feedeeba843b106eb0a&units=metric`;

//C to F converstion

https: function funits(event) {
  event.preventDefault();
  let unitsTemp = document.querySelector("#temperature");
  unitsTemp.innerHTML = 66;
}

function cunits(event) {
  event.preventDefault();
  let unitsTemp = document.querySelector("#temperature");
  unitsTemp.innerHTML = 19;
}

let clickUnitF = document.querySelector("#faren-id");
clickUnitF.addEventListener("click", funits);

let clickUnitC = document.querySelector("#celsius-id");
clickUnitC.addEventListener("click", cunits);

//geolocator button temperature
function buttonWeather(response) {
  function handlePosition(position) {
    function weather(response) {
      let cityHeading = document.querySelector("#cityHeader");
      let currentLocation = response.data.name;
      cityHeading.innerHTML = `${currentLocation}`;

      let cityWeather = document.querySelector("#temperature");
      console.log(response.data);
      let temperature = Math.round(response.data.main.temp);
      cityWeather.innerHTML = `${temperature}`;
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
}
let locateButton = document.querySelector("#currentLocation");
locateButton.addEventListener("click", buttonWeather);
