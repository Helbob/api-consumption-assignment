"use strict";

import { apiKeyOpenWeather } from "./info.js";

const urlOpenWeather = "https://api.openweathermap.org/";
let cityName = "Copenhagen";

const queryOpenWeather = (query) => {
  const endpointOpenWeather = `${urlOpenWeather}data/2.5/weather?q=${cityName}&appid=${apiKeyOpenWeather}`;
  fetch(endpointOpenWeather, {
    headers: {
      Authorization: `Bearer ${apiKeyOpenWeather}`,
    },
  })
    .then((response) => response.text())
    .then((data) => showFilms(JSON.parse(data)))
    .catch((error) => console.log("error", error));
};

queryOpenWeather();
