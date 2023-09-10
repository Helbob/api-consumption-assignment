"use strict";

import { apiKeyOpenWeather, apiKeyTicketMaster } from "./info.js";

const options = { method: "GET" };
const dataBtn = document.querySelector("#weather-data");

dataBtn.addEventListener("click", function (e) {
  let cityName = document.querySelector("#cityName").value;
  e.preventDefault();
  if (cityName == "") {
    console.log("Enter cityname");
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKeyOpenWeather}`,
      options
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("ERROR");
        }
      })
      .then((data) => {
        console.log(data);
        displayWeather(data);
      })
      .catch((error) => console.error("FETCH ERROR:", error));

    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?size=1&city=${cityName}&apikey=${apiKeyTicketMaster}`,
      options
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("ERROR");
        }
      })
      .then((event) => {
        console.log(event);
        displayTicketMaster(event);
      })
      .catch((error) => console.error("FETCH ERROR:", error));
  }
});

function displayWeather(data) {
  let html = "";
  html += `
        <h2><span>City: </span>${data.name}</h2>
        <h2><span>Temp: </span>${data.main.temp} °C</h2>
        <h2><span>Feels like: </span>${data.main.feels_like} °C</h2>
        `;

  document.querySelector("#display_data").innerHTML = html;
}

function displayTicketMaster(event) {
  let htmltwo = "";
  if (event.page.totalElements === 0) {
    console.log("No events");
    document.querySelector("#display_datatwo").innerHTML = htmltwo;
  } else {
    htmltwo += `
        <h2><span>Test: </span>${event._embedded.events[0].name}</h2>
        `;

    document.querySelector("#display_datatwo").innerHTML = htmltwo;
  }
}
