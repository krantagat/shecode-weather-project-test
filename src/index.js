// formatDate
let currentTime = new Date();
let dayName = [
  "Sunday ",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday ",
  "Saturday",
];

let monthName = [
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

let currentDay = dayName[currentTime.getDay()];
let currentDate = currentTime.getDate();
let currentMonth = monthName[currentTime.getMonth()];
let currentYear = currentTime.getFullYear();

let formatDate = `${currentDay} ${currentDate} ${currentMonth} ${currentYear}     `;

let displayDate = document.querySelector("#current-date");

displayDate.innerHTML = formatDate;

// formatTime

let currenthour = String(currentTime.getHours()).padStart(2, "0");
let currentminute = String(currentTime.getMinutes()).padStart(2, "0");
let formatTime = `| ${currenthour}:${currentminute}`;

let displayTime = document.querySelector("#current-time");
displayTime.innerHTML = formatTime;

// Update city from search

function searchCity(search) {
  search.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let cityToSearch = searchCity.value;

  let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${apiKey}&units=metric`;

  function showSearchCityData(response) {
    let mainCity = document.querySelector("#main-city");
    let mainTemp = document.querySelector("#main-temp");
    let mainRealfeel = document.querySelector("#main-realfeel");
    let mainSunTime = document.querySelector("#main-suntime");

    let Temperature = Math.round(response.data.main.temp);
    let CityNameFormated = response.data.name;
    let wind = Math.round(response.data.wind.speed);
    let realfeel = Math.round(response.data.main.feels_like);
    let humidity = response.data.main.humidity;
    let mainRealfeelFormated = `RealFeel ${realfeel}°C <br /> Wind: ${wind} km/h <br /> Humidity: ${humidity}%`;
    let mainTimeZone = response.data.timezone;
    let mainSunrise = response.data.sys.sunrise;
    let mainSunset = response.data.sys.sunset;
    let mainSuntimeFormated = `Time Zone: ${mainTimeZone} <br /> Sunrise: ${mainSunrise} <br /> Sunset: ${mainSunset}`;

    mainCity.innerHTML = CityNameFormated;
    mainTemp.innerHTML = Temperature;
    mainRealfeel.innerHTML = mainRealfeelFormated;
    mainSunTime.innerHTML = mainSuntimeFormated;
  }
  axios.get(apiUrl).then(showSearchCityData);
}
let searchBox = document.querySelector("#search-form");
searchBox.addEventListener("submit", searchCity);

// Update city from currentlocation
function showCurrentLocationTemp(currentlocation) {
  currentlocation.preventDefault();

  function handlePosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "ff1d9ea9376b5c27a82e04fc2b2abdbb";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentLocationData);
  }

  function showCurrentLocationData(response) {
    let mainCity = document.querySelector("#main-city");
    let mainTemp = document.querySelector("#main-temp");
    let mainRealfeel = document.querySelector("#main-realfeel");
    let mainSunTime = document.querySelector("#main-suntime");

    let temperature = Math.round(response.data.main.temp);
    let cityNameFormated = response.data.name;
    let wind = Math.round(response.data.wind.speed);
    let realfeel = Math.round(response.data.main.feels_like);
    let humidity = response.data.main.humidity;
    let mainRealfeelFormated = `RealFeel ${realfeel}°C <br /> Wind: ${wind} km/h <br /> Humidity: ${humidity}%`;
    let mainTimeZone = response.data.timezone;
    let mainSunrise = response.data.sys.sunrise;
    let mainSunset = response.data.sys.sunset;
    let mainSuntimeFormated = `Time Zone: ${mainTimeZone} <br /> Sunrise: ${mainSunrise} <br /> Sunset: ${mainSunset}`;

    mainCity.innerHTML = cityNameFormated;
    mainTemp.innerHTML = temperature;
    mainRealfeel.innerHTML = mainRealfeelFormated;
    mainSunTime.innerHTML = mainSuntimeFormated;
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocationTemp);

// function showCurrentLocationTemp(response) {
//   let temp = Math.round(response.data.main.temp);
//   let h1 = document.querySelector("h1");
//   h1.innerHTML = `The temperature outside is ${temp}`;
//   console.log();

// Change unit

// function changeToCelcius(event) {
//   event.preventDefault();
//   let mainTemp = document.querySelector("#main-temp");
//   mainTemp.innerHTML = 22;
// }

// function changeToFahrenheit(event) {
//   event.preventDefault();
//   let mainTemp = document.querySelector("#main-temp");
//   mainTemp.innerHTML = 66;
// }

// let celcius = document.querySelector("#celsius");
// celcius.addEventListener("click", changeToCelcius);

// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", changeToFahrenheit);
