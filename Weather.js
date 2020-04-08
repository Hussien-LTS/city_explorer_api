'use strict'
const superagent = require('superagent');

// const allConstrctor = {};

/////////weather route


server.get('/weather', (req, res) => {

    let weaterAllArr = [];
    // const weatherData = require('./data/weather.json')
    let key = process.env.WEATHER_API_KEY
    let city = req.query.search_query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`;

    superagent.get(url).then(weatherData => {

        weatherData.body.data.map((value) => {
            // let description = val.weather.description;
            // let data = val.datetime;
            var weatherData = new allConstrctor.Weather(value);
            weaterAllArr.push(weatherData);
            allHelper.onErorr();

        })
        res.send(weaterAllArr);

    })
});


//// Weather constrctor 


allConstrctor.Weather = function(value) {
    this.search_query = value.city;
    this.forecast = value.weather.description;
    this.time = value.data;
}







// module.exports = ;