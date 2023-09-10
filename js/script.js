"use strict";

import { apiKeyOpenWeather, apiKeyTicketMaster } from "./info.js";

const options = { method: "GET" };
const dataBtn = document.querySelector("#weather-data");

dataBtn.addEventListener("click", function (e) {
  let cityName = document.querySelector("#cityName").value;
  e.preventDefault();
  if (cityName == "") {
    alert("Please enter cityname");
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
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKeyTicketMaster}&locale=*&city=${cityName}`,
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
        showEvents(event);
      })
      .catch((error) => console.error("FETCH ERROR:", error));
  }
});

function displayWeather(data) {
  let htmlWeather = "";
  htmlWeather += `
        <h3><span>City: </span>${data.name}</h3>
        <p><span>Temp: </span>${data.main.temp} °C</p>
        <p><span>Feels like: </span>${data.main.feels_like} °C</p>
        `;

  document.querySelector("#display_weather").innerHTML = htmlWeather;
}

/* function displayTicketMaster(event) {
  let htmlTicket = "";
  if (event.page.totalElements === 0) {
    console.log("No events");
    document.querySelector("#display_ticket").innerHTML = htmlTicket;
  } else {
    htmlTicket += `
        <h2><span>Event: </span>${event._embedded.events[0].name}</h2>
        <h2><span>asd: </span>${event._embedded.venues}</h2>
        <p><span></span>${event._embedded.events[0].dates.start.localDate} <br> At ${event._embedded.events[0].dates.start.localTime}</p>
        `;

    document.querySelector("#display_ticket").innerHTML = htmlTicket;
  }
} */

// i need a foreach

const showEvents = (event) => {
  let htmlTicket = "";
  if (event.page.totalElements === 0) {
    document.querySelector("#display_ticket").innerHTML = htmlTicket;
  } else {
    event._embedded.events.forEach((item) => {
      htmlTicket += `
        <article class="test">
        <p>${item.name}</p>
        <p><span>Date: </span>${item.dates.start.localDate}</p>
        <p><span>Time: </span>${item.dates.start.localTime}</p>
        </article>
        `;

      document.querySelector("#display_ticket").innerHTML = htmlTicket;
    });
  }
};
