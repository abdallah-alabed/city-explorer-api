"use strict";
const Movie = require("../models/movies.model");
const axios = require("axios");
const MovieCache = require("../helpers/MovieCache");
let cache = new MovieCache();


let currentCity = "";

const movieController = (req, res) => {
  let searchQuery3 = req.query.query;
  let currentDate = new Date();
  if (
    cache.data.length != 0 &&
    cache.date.getDate() === currentDate.getDate() &&
    currentCity == searchQuery3
  ){
    const movieArray = cache.data.results.map((elem) => {
        return new Movie(elem);
      });
      res.json(movieArray);
    currentCity = searchQuery3;
  }
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery3}`
    )
    .then((item) => {
        cache.data = item.data;
        cache.date = currentDate;
      const movieArray = item.data.results.map((elem) => {
        return new Movie(elem);
      });
      res.json(movieArray);
      currentCity = searchQuery3;
    })
    .catch((error) => {
      res
        .status(500)
        .send(
          `Error Code: ${error} Movie feature not available for this city.`
        );
    });
};
module.exports = movieController;
