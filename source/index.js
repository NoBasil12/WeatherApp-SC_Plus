let now = new Date();
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
let hours = now.getHours();
let minutes = now.getMinutes();
// console.log(`${day} ${hours}: ${minutes}`);
let currentTime = document.querySelector("#date");
let city = document.querySelector("#city");
let cityField = document.querySelector("#city-field");
let citySubmit = document.querySelector("#city-submit");

function printTime() {
  currentTime.innerHTML = `${day} ${hours}: ${minutes}`;
}

printTime();

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5a889f50451580c7938b39a2504fc57f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function changeCity(event) {
  event.preventDefault();
  //city.innerHTML = cityField.value;
  //cityField.value = null;
  let city = document.querySelector("#city-field").value;
  searchCity(city);
}

citySubmit.addEventListener("click", changeCity);

function searchLocation(position) {
  let apiKey = "5a889f50451580c7938b39a2504fc57f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

/*function degreeCelsius(celsius) {
  event.preventDefault();
  let celsiusInput = document.querySelectorAll(".fc-degree");
  for (let i = 0; i < celsiusInput.length; ++i) {
    celsiusInput[i].innerHTML = "20ºC";
  }
}

function degreeFahrenheit(fahrenheit) {
  event.preventDefault();
  let fahrenheitInput = document.querySelectorAll(".fc-degree");
  for (let i = 0; i < fahrenheitInput.length; ++i) {
    fahrenheitInput[i].innerHTML = "60ºF";
  }
}

let showCelsius = document.querySelector("#celsius");
showCelsius.addEventListener("click", degreeCelsius);

let showFahrenheit = document.querySelector("#fahrenheit");
showFahrenheit.addEventListener("click", degreeFahrenheit); */

let currentLocation = document.querySelector("#current-city");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Lisbon");