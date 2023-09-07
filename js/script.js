"use strict";

import { apiKeyOpenWeather } from "./info.js";

const urlOpenWeather = "https://api.openweathermap.org/";

const queryOpenWeather = (query) => {
  const endpointOpenWeather = `${urlOpenWeather}data/2.5/weather?q=${query}&appid=${apiKeyOpenWeather}`;
  console.log(endpointOpenWeather);

  fetch(endpointOpenWeather, {
    headers: {
      Authorization: `Bearer ${apiKeyOpenWeather}`,
    },
  })
    .then((response) => response.text())
    .then((data) => showFilms(JSON.parse(data)))
    .catch((error) => console.log("error", error));
};
