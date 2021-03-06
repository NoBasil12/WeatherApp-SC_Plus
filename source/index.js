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
if (minutes < 10) {
  minutes = `0${minutes}`;
}

// console.log(`${day} ${hours}: ${minutes}`);
let currentTime = document.querySelector("#date");
let city = document.querySelector("#city");
let cityField = document.querySelector("#city-field");
let citySubmit = document.querySelector("#city-submit");
let iconElement = document.querySelector("#icon");

function printTime() {
  currentTime.innerHTML = `${day} ${hours}:${minutes}`;
}

printTime();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[day];
}

function displayForecast(response) {
  //console.log(response.data.daily);
  // let forecast = response.data.daily;
  document.querySelector("#forcast-day-one").innerHTML = formatDay(
    response.data.daily[1].dt
  );
  document.querySelector("#day-one-max-degree").innerHTML = Math.round(
    response.data.daily[1].temp.max
  );
  document.querySelector("#day-one-min-degree").innerHTML = Math.round(
    response.data.daily[1].temp.min
  );
  document.querySelector("#day-one-description").innerHTML =
    response.data.daily[1].weather[0].main;
  document.querySelector(
    "#day-one-icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png" />`;
  document.querySelector("#day-one-humidity").innerHTML =
    response.data.daily[1].humidity;
  document.querySelector("#day-one-wind").innerHTML = Math.round(
    response.data.daily[1].wind_speed
  );
  //day2
  document.querySelector("#forcast-day-two").innerHTML = formatDay(
    response.data.daily[2].dt
  );
  document.querySelector("#day-two-max-degree").innerHTML = Math.round(
    response.data.daily[2].temp.max
  );
  document.querySelector("#day-two-min-degree").innerHTML = Math.round(
    response.data.daily[2].temp.min
  );
  document.querySelector("#day-two-description").innerHTML =
    response.data.daily[2].weather[0].main;
  document.querySelector(
    "#day-two-icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png" />`;

  document.querySelector("#day-two-humidity").innerHTML =
    response.data.daily[2].humidity;
  document.querySelector("#day-two-wind").innerHTML = Math.round(
    response.data.daily[2].wind_speed
  );

  //day3
  document.querySelector("#forcast-day-three").innerHTML = formatDay(
    response.data.daily[3].dt
  );
  document.querySelector("#day-three-max-degree").innerHTML = Math.round(
    response.data.daily[3].temp.max
  );
  document.querySelector("#day-three-min-degree").innerHTML = Math.round(
    response.data.daily[3].temp.min
  );
  document.querySelector("#day-three-description").innerHTML =
    response.data.daily[3].weather[0].main;
  document.querySelector(
    "#day-three-icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png" />`;

  document.querySelector("#day-three-humidity").innerHTML =
    response.data.daily[3].humidity;
  document.querySelector("#day-three-wind").innerHTML = Math.round(
    response.data.daily[3].wind_speed
  );
}

function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "5a889f50451580c7938b39a2504fc57f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  //console.log(response.data);
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
  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" />`;

  getForecast(response.data.coord);
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
    celsiusInput[i].innerHTML = "20??C";
  }
}

function degreeFahrenheit(fahrenheit) {
  event.preventDefault();
  let fahrenheitInput = document.querySelectorAll(".fc-degree");
  for (let i = 0; i < fahrenheitInput.length; ++i) {
    fahrenheitInput[i].innerHTML = "60??F";
  }
}

let showCelsius = document.querySelector("#celsius");
showCelsius.addEventListener("click", degreeCelsius);

let showFahrenheit = document.querySelector("#fahrenheit");
showFahrenheit.addEventListener("click", degreeFahrenheit); */

let currentLocation = document.querySelector("#current-city");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("Lisbon");
