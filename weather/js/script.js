'use strict';

const latitude = document.querySelector('.geo-form__input--latitude'),
      longitude = document.querySelector('.geo-form__input--longitude'),
      cities = document.querySelector('.geo-form__input--cities'),
      formBtnAdd = document.querySelector('.geo-form__btn--add'),
      formBtnClear = document.querySelector('.geo-form__btn--delete'),
      citiesList = document.querySelector('.cities'),
      weatherCity = document.querySelector('.weather-card__city'),
      weatherDegrees = document.querySelector('.weather-card__degrees'),
      weatherDegreesFeelsLike = document.querySelector('.weather-card__feelslike'),
      weatherClouds = document.querySelector('.weather-card__clouds'),
      weatherHumidity = document.querySelector('.weather-card__humidity'),
      backgroundVideo = document.querySelector('.header__video');

const getData = async function (url) {
  const result = await fetch(url);
  if (!result.ok) {
    throw "Ошибка: " + result.status;
  }
  return await result.json();
};

formBtnAdd.addEventListener('click', () => {
  let url = `https://api.openweathermap.org/data/2.5/find?lat=${latitude.value}&lon=${longitude.value}&cnt=${cities.value}&lang=ru&appid=e66353b28fdbc3b08272e315295d6bcf`;

  getData(url).then(function (data) {
    let citiesArr = [...data.list];

    citiesArr.map(item => {
      citiesList.innerHTML += `
          <option value="${item.name}" data-id="${item.id}">${item.name}</option>
        `;
        
      citiesList.addEventListener('change', () => {
        weatherCity.textContent = citiesList.value;

        if (citiesList.value === item.name) {
          weatherDegrees.textContent = (item.main.temp - 273.15).toFixed(0) + '°';
          weatherDegreesFeelsLike.textContent = `Чувствуется как: ${(item.main.feels_like - 273.15).toFixed(0)}°`;
          weatherClouds.textContent = item.weather[0].description;
          weatherHumidity.textContent = `Влажность: ${item.main.humidity}%`
        }

        if ((weatherDegrees.textContent).substring(0, (weatherDegrees.textContent).length - 1) > 10) {
          backgroundVideo.src = '';
          backgroundVideo.src = './video/shine.m4v';
        } else if ((weatherDegrees.textContent).substring(0, (weatherDegrees.textContent).length - 1) < 5) {
          backgroundVideo.src = '';
          backgroundVideo.src = './video/snow(2).m4v';
        } else {
          backgroundVideo.src = '';
          backgroundVideo.src = './video/raining.m4v';
        }
      });

      console.log(item);
    });

    return citiesList;
  });
});
// console.log(weatherDegrees.value);

formBtnClear.addEventListener('click', () => citiesList.innerHTML = '<option selected>Выберите город</option>');

// citiesList.addEventListener('change', () => {
//   weatherCity.textContent = citiesList.value;
// });