var searchButtonEl = document.querySelector('.search-btn');
var currentCityHeadingEl = document.querySelector('.current-city');
var currentDay = moment().format('ddd, MMM Do YYYY');
var cityName = document.getElementById('#search-box');
var clearButtonEl = document.querySelector('.clear-history');

// add an event listener for the search button
searchButtonEl.addEventListener('click', function () {
  citySearch();
  saveSearch();
});

// when search button is clicked, take value of search box content, and send to API

function citySearch() {
  cityName = document.querySelector('#search-box').value;
  fetch(
    'http://api.openweathermap.org/data/2.5/weather?q=' +
      cityName +
      '&units=imperial&appid=c9902fd75e66437814f74c9e1aae5a52'
  )
    .then(function (cityRepsonse) {
      return cityRepsonse.json();
    })
    .then(function (cityRepsonse) {
      console.log(cityRepsonse);
      var longitude = cityRepsonse.coord.lon;
      var latitude = cityRepsonse.coord.lat;
      console.log(longitude, latitude);
      return fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          latitude +
          '&lon=' +
          longitude +
          '&units=imperial&appid=c9902fd75e66437814f74c9e1aae5a52'
      );
    })
    .then(function (currentCityWeather) {
      return currentCityWeather.json();
    })
    .then(function (currentCityWeather) {
      console.log(currentCityWeather);

      // take API result, and display in main card

      var imageEl = document.querySelector('.icon');
      var currentDayIcon = currentCityWeather.current.weather[0].icon;
      var iconEl = document.createElement('img');
      imageEl.innerHTML = '';
      iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + currentDayIcon + '@2x.png');
      imageEl.appendChild(iconEl);

      currentCityHeadingEl.textContent = cityName + ' - ' + currentDay;

      var currentTemp = document.querySelector('.current-temp');
      currentTemp.textContent = 'Temperature: ' + currentCityWeather.current.temp + ' Farenheit';

      var currentHum = document.querySelector('.current-hum');
      currentHum.textContent = 'Humidity: ' + currentCityWeather.current.humidity + '%';

      var currentWind = document.querySelector('.current-wind');
      currentWind.textContent = 'Wind Speed: ' + currentCityWeather.current.wind_speed + 'mph';

      var currentUv = document.querySelector('.current-uv');
      currentUv.textContent = 'UV Index: ' + currentCityWeather.current.uvi;
    });
}

// function to create new button and add value to local storage
function saveSearch() {
  var searchesEl = document.querySelector('.recent-searches');
  var newSave = document.createElement('button');
  newSave.classList.add('btn', 'btn-secondary', 'd-grid', 'col-10', 'search-btn');
  searchesEl.appendChild(newSave);
  newSave.textContent = document.querySelector('#search-box').value;
}
// list previous search in the "previous searches" container as buttons

clearButtonEl.addEventListener('click', localStorage.clear());
