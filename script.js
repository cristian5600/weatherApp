const WEATHER_KEY = `446a5d0a8e6afa8ac3c3a53b04f5c75b`;

function drawWeather(d) {
  var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  var fahrenheit = Math.round((parseFloat(d.main.temp) - 273.15) * 1.8 + 32);

  document.getElementById("description").innerHTML = d.weather[0].description;
  document.getElementById("temp").innerHTML = celcius + "&deg;";
  document.getElementById("location").innerHTML = d.name;
}

function getData(city) {
  document.getElementsByClassName(`animation`)[0].setAttribute(`id`, ``);
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&APPID=" +
      WEATHER_KEY,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      //console.log(response)
      document
        .getElementsByClassName(`animation`)[0]
        .setAttribute(`id`, `hidden`);
      drawWeather(response);
      console.log(response.main);
      return response.main;
    })
    .catch((error) => {
      alert(`${city} not found`);
    });
}

getData(`Bucharest`);
const FORM = document.forms[0];
FORM.addEventListener(`submit`, (e) => {
  e.preventDefault();
  console.log(FORM.elements[0].value);
  getData(FORM.elements[0].value);
  FORM.reset();
});
