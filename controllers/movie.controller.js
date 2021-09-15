'use strict'
const Movie=require('../models/movies.model')
const axios = require('axios');


const movieController=(req, res)=> {

    let searchQuery3 = req.query.query

       axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery3}`)
        .then(item => {
            const movieArray = item.data.results.map(elem => {
                return new Movie(elem);
            })
            res.json(movieArray);
        })
        .catch(error => {
            res.status(500).send(`Error Code: ${error} Movie feature not available for this city.`);
        })
}
module.exports=movieController