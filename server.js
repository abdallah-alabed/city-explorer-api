'use strict'

const express=require('express');
const app=express();

const cors=require('cors');
app.use(cors());

require('dotenv').config();

const PORT= process.env.PORT;
const weatherData=require('./data/weather.json')
const axios = require('axios');

////// FOR LAB 7 ////////////

// app.get('/weather', (req, res) => {
//     let searchQuery = req.query.searchQuery;
//     let lat = req.query.lat;
//     let lon = req.query.lon;

//     let allData = weatherData.find(item => {
//         if (searchQuery == item.city_name.toLowerCase() && lat == item.lat && lon == item.lon) {
//             return item;
//         }
//     })
//     try {
//         let forecastObj = [];
//         let date;
//         let description;
        

//        allData.data.map(e=>{
//         date = e.valid_date;
//         description=  e.weather.description;
//         forecastObj.push(new Forecast(date, description));       
//      }
// ) 
//         res.status(200).send(forecastObj);
//     } catch {
//         res.status(500).send('data not found');
//     }
// })

// app.listen(PORT, ()=>{
//     console.log(`Listening on port ${PORT}` )
// });

// class Forecast {
//     constructor(date, description) {
//         this.date = date;
//         this.description = description;
//     }
// }

app.get('/weather', (req, res)=> {
    
    let searchQuery2 = req.query.searchQuery
       axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery2}&key=${process.env.WEATHER_API_KEY}`)
        .then(item => {
            const weatherArray = item.data.data.map(elem => {
                return new Forecast(elem);
            })
            res.send(weatherArray);
        })
        .catch(error => {
            res.status(500).send(`Error Code: ${error} weather feature not available for this city.`);
        })

})



class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `the weather will be with ${item.weather.description}`;
    }
}



app.get('/movie',(req, res)=> {

    let searchQuery3 = req.query.searchQuery
       axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery3}`)
        .then(item => {
            const movieArray = item.data.results.map(elem => {
                return new Movie(elem);
            })
            res.send(movieArray);
        })
        .catch(error => {
            res.status(500).send(`Error Code: ${error} Movie feature not available for this city.`);
        })
})


class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
        
    }
}
