'use strict'

const express=require('express');
const app=express();

const cors=require('cors');
app.use(cors());

require('dotenv').config();

const PORT= process.env.PORT;
const weatherData=require('./data/weather.json')
// const axios = require('axios');



app.get('/weather', (req, res) => {
    let searchQuery = req.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon;

    let allData = weatherData.find(item => {
        if (searchQuery == item.city_name.toLowerCase() && lat == item.lat && lon == item.lon) {
            return item;
        }
    })
    try {
        let forecastObj = [];
        let date;
        let description;
        

       allData.data.map(e=>{
        date = e.valid_date;
        description=  e.weather.description;
        forecastObj.push(new Forecast(date, description));       
     }
) 
        res.status(200).send(forecastObj);
    } catch {
        res.status(500).send('data not found');
    }
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}` )
});

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

   