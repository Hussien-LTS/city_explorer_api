'use strict'
const superagent = require('superagent');



/////////weather route


function weatherhandler  (req, res)  {

    let weaterAllArr = [];
    // const weatherData = require('./data/weather.json')
    let key = process.env.WEATHER_API_KEY
    let city = req.query.search_query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`;

    superagent.get(url).then(weatherData => {

        weatherData.body.data.map((value) => {
            // let description = val.weather.description;
            // let data = val.datetime;
            var weatherData = new Weather(value);
            weaterAllArr.push(weatherData);
            // onErorr();

        })
        res.send(weaterAllArr);

    })
};


//// Weather constrctor 


function Weather (value) {
    this.search_query = value.city;
    this.forecast = value.weather.description;
    this.time = value.data;
}

//// weatherhandler export to server.js

module.exports = weatherhandler;

 //// on error emport to Weather.js 

//  const onErorr = require('./server.js')