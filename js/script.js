var searchButtonEl = document.querySelector('.search-btn');
var currentCityHeadingEl = document.querySelector('.current-city');
var currentDay = moment().format('ddd, MMM Do YYYY');
var cityName = document.getElementById('#search-box');
var clearButtonEl = document.querySelector('.clear-history');
var futureDaysEl = document.querySelector('.future-days');

// add an event listener for the search button
searchButtonEl.addEventListener('click', function () {
  citySearch();
  saveSearch();
  futureDaysEl.classList.remove('hide');
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
      currentWind.textContent = 'Wind Speed: ' + currentCityWeather.current.wind_speed + ' mph';

      var currentUv = document.querySelector('.current-uv');
      currentUv.textContent = 'UV Index: ' + currentCityWeather.current.uvi;

      // display forecast data on future-divs

      // day one
      var dayOneForecast = $('#future-day-one');
      var dayOneDate = $('<h4>')
        .addClass('date-text')
        .text(moment().add(1, 'days').format('ddd, MMM, Do'));
      var dayOneTemp = $('<p>')
        .addClass('temp-text')
        .text('Temp: ' + currentCityWeather.daily[0].temp.day + ' Farenheit');
      var dayOneHum = $('<p>')
        .addClass('hum-text')
        .text('Hum: ' + currentCityWeather.daily[0].humidity + '%');
      var dayOneWind = $('<p>')
        .addClass('wind-text')
        .text('Wind: ' + currentCityWeather.daily[0].wind_speed + ' mph');
      var dayOneUv = $('<p>')
        .addClass('uv-text')
        .text('UV Index: ' + currentCityWeather.daily[0].uvi);
      $(dayOneForecast).append(dayOneDate, dayOneTemp, dayOneHum, dayOneWind, dayOneUv);

      // day two
      var dayTwoForecast = $('#future-day-two');
      var dayTwoDate = $('<h4>')
        .addClass('date-text')
        .text(moment().add(2, 'days').format('ddd, MMM, Do'));
      var dayTwoTemp = $('<p>')
        .addClass('temp-text')
        .text('Temp: ' + currentCityWeather.daily[1].temp.day + ' Farenheit');
      var dayTwoHum = $('<p>')
        .addClass('hum-text')
        .text('Hum: ' + currentCityWeather.daily[1].humidity + '%');
      var dayTwoWind = $('<p>')
        .addClass('wind-text')
        .text('Wind: ' + currentCityWeather.daily[1].wind_speed + ' mph');
      var dayTwoUv = $('<p>')
        .addClass('uv-text')
        .text('UV Index: ' + currentCityWeather.daily[1].uvi);
      $(dayTwoForecast).append(dayTwoDate, dayTwoTemp, dayTwoHum, dayTwoWind, dayTwoUv);

      // day three
      var dayThreeForecast = $('#future-day-three');
      var dayThreeDate = $('<h4>')
        .addClass('date-text')
        .text(moment().add(3, 'days').format('ddd, MMM, Do'));
      var dayThreeTemp = $('<p>')
        .addClass('temp-text')
        .text('Temp: ' + currentCityWeather.daily[2].temp.day + ' Farenheit');
      var dayThreeHum = $('<p>')
        .addClass('hum-text')
        .text('Hum: ' + currentCityWeather.daily[2].humidity + '%');
      var dayThreeWind = $('<p>')
        .addClass('wind-text')
        .text('Wind: ' + currentCityWeather.daily[2].wind_speed + ' mph');
      var dayThreeUv = $('<p>')
        .addClass('uv-text')
        .text('UV Index: ' + currentCityWeather.daily[2].uvi);
      $(dayThreeForecast).append(dayThreeDate, dayThreeTemp, dayThreeHum, dayThreeWind, dayThreeUv);

      // day four
      var dayFourForecast = $('#future-day-four');
      var dayFourDate = $('<h4>')
        .addClass('date-text')
        .text(moment().add(4, 'days').format('ddd, MMM, Do'));
      var dayFourTemp = $('<p>')
        .addClass('temp-text')
        .text('Temp: ' + currentCityWeather.daily[3].temp.day + ' Farenheit');
      var dayFourHum = $('<p>')
        .addClass('hum-text')
        .text('Hum: ' + currentCityWeather.daily[3].humidity + '%');
      var dayFourWind = $('<p>')
        .addClass('wind-text')
        .text('Wind: ' + currentCityWeather.daily[3].wind_speed + ' mph');
      var dayFourUv = $('<p>')
        .addClass('uv-text')
        .text('UV Index: ' + currentCityWeather.daily[3].uvi);
      $(dayFourForecast).append(dayFourDate, dayFourTemp, dayFourHum, dayFourWind, dayFourUv);

      // day five
      var dayFiveForecast = $('#future-day-five');
      var dayFiveDate = $('<h4>')
        .addClass('date-text')
        .text(moment().add(5, 'days').format('ddd, MMM, Do'));
      var dayFiveTemp = $('<p>')
        .addClass('temp-text')
        .text('Temp: ' + currentCityWeather.daily[4].temp.day + ' Farenheit');
      var dayFiveHum = $('<p>')
        .addClass('hum-text')
        .text('Hum: ' + currentCityWeather.daily[4].humidity + '%');
      var dayFiveWind = $('<p>')
        .addClass('wind-text')
        .text('Wind: ' + currentCityWeather.daily[4].wind_speed + ' mph');
      var dayFiveUv = $('<p>')
        .addClass('uv-text')
        .text('UV Index: ' + currentCityWeather.daily[4].uvi);
      $(dayFiveForecast).append(dayFiveDate, dayFiveTemp, dayFiveHum, dayFiveWind, dayFiveUv);
    });
}
// function to create new button and add value to local storage
function saveSearch() {
  var searchesEl = document.querySelector('.recent-searches');
  var newSave = document.createElement('button');
  newSave.classList.add('btn', 'btn-secondary', 'd-grid', 'col-10', 'history-btn');
  searchesEl.appendChild(newSave);
  newSave.textContent = document.querySelector('#search-box').value;
  cityName = document.querySelector('#search-box').value;

  localStorage.setItem('city', cityName);
}

clearButtonEl.addEventListener('click', function () {
  var historyBtn = document.querySelectorAll('.history-btn');
  historyBtn.remove();
});
