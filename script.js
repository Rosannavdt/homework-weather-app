let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dateNow = new Date();
let currentDay = dateNow.getDay();
let currentDate = dateNow.getDate();
let currentMonth = dateNow.getMonth();
let hour = dateNow.getHours();
let minute = dateNow.getMinutes();

let date = document.querySelector("#current-date");
let time = document.querySelector("#current-time");
date.innerHTML = `${days[currentDay]} ${currentDate} | ${months[currentMonth]}`;
time.innerHTML = `${hour} : ${minute}`;

// challenge 2
function search(event) {
  event.preventDefault();

  let apiKey = "92a130a46565e7d85d7d55d01afb2d4a";

  let searchInput = document.querySelector("#location-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature} °C `;
}

function showCurrentWeather(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  console.log(response.data.name);

  let currentButtonTemperature = document.querySelector("#current-temperature");
  currentButtonTemperature.innerHTML = `${Math.round(
    response.data.main.temp
  )} °C `;
}

function showCurrentPosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  let apiKey = "92a130a46565e7d85d7d55d01afb2d4a";

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentWeather);
}

function getCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", getCurrentLocationWeather);
