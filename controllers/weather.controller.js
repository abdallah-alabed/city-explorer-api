'use strict'
const Forecast=require('../models/weather.model')
const axios = require('axios');


const weatherController= (req, res)=> {
    
    let searchQuery2 = req.query.city
       axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery2}&key=${process.env.WEATHER_API_KEY}`)
        .then(item => {
            const weatherArray = item.data.data.map(elem => {
                return new Forecast(elem);
            })
            res.json(weatherArray);
        })
        .catch(error => {
            res.status(500).send(`Error Code: ${error} weather feature not available for this city.`);
        })

}
module.exports=weatherController