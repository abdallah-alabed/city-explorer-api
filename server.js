'use strict'

const express=require('express');
const app=express();

const cors=require('cors');
app.use(cors());

require('dotenv').config();

const PORT= process.env.PORT;
const weatherData=require('./data/weather.json')

// app.get('/',(req,res)=>{
//         res.status(200).send('hello')
//     });
//  app.get('/data',(req,res)=>{
    
//         let city=weatherData.map(day=>{
//             return {
//                 city_name:day.city_name,
//                 lat:day.lat,
//                 lon:day.lon,
//                 date:day.data.valid_date,
//                 description:day.data.weather.description
//             }
//         })

//         let customRespone={
//             forecast:forecastDays,
//             city_name:city.city_name   
//         }
//         res.status(200).json(customRespone);
//     });

    let result=[];
    let ForecastObj=[];

    app.get('/weather',(req,res)=>{
        let lat=Number(req.query.lat);
        let lon=Number(req.query.lon);
        let searchQuery=req.query.searchQuery;


        if (lat && lon && searchQuery){
            weatherData.find(item=>{
            if(item.city_name===searchQuery){
                result.push(item)} 
        
            }),
               
                ForecastObj=(weatherData).map(elem=>{  return (new Forecast( elem.data.map(e=>e.valid_date),elem.data.map(e=>e.weather.description)) )     })
                console.log(ForecastObj)
                res.status(200).json(ForecastObj)}
        else{
                        res.status(500).send('error');
            }})
    
    


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}` )
});

class Forecast{
    constructor(valid_date, description){
        this.valid_date=valid_date
        this.description=description
    }}
