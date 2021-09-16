"use strict";
const Forecast = require("../models/weather.model");
const axios = require("axios");
const Cache = require("../helpers/Cache");
let cache = new Cache();

let currentCity = "";

const weatherController = (req, res) => {
  let searchQuery2 = req.query.city;
  let currentDate = new Date();

//   console.log("cache date", cache.data);
  if (
    cache.data.length != 0 &&
    cache.date.getDate() === currentDate.getDate() &&
    currentCity == searchQuery2
  ) {
    const weatherArray = cache.data.data.map((elem) => {
      return new Forecast(elem);
    });
    res.json(weatherArray);
    currentCity = searchQuery2;
  } else {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery2}&key=${process.env.WEATHER_API_KEY}`
      )
      .then((item) => {
        cache.data = item.data;
        cache.date = currentDate;
        const weatherArray = item.data.data.map((elem) => {
          return new Forecast(elem);
        });
        res.json(weatherArray);
        currentCity = searchQuery2;
      })
      .catch((error) => {
        res
          .status(500)
          .send(
            `Error Code: ${error} weather feature not available for this city.`
          );
      });
  }
};
module.exports = weatherController;
