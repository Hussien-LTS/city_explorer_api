'use strict'

require('dotenv').config();

///////////////////////////////////////////////////////////////////////


const express = require('express');

const cors = require('cors');

const superagent = require('superagent');

const PORT = process.env.PORT || 3000

const server = express();

server.use(cors());



////////////////////////////////////////////////////////////////////////


server.get('/location', (req, res) => {
    // const geoData = require('./data/geo.json');
    let key = process.env.LOCATION_API_KEY;
    const city = req.query.city;
    const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
    superagent.get(url)
        .then(geoData => {
            // console.log('wwwwwwwwwwwwwwwwww', geoData)
            const locationData = new Location(city, geoData.body);
            res.send(locationData);
        })
})


/////////////////////////////////////////////////////////////////////////


function Location(city, geoData) {
    this.city = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;

}


////////////////////////////////////////////////////////////////////////


server.get('/weather', (req, res) => {

    // const weatherData = require('./data/weather.json')
    let key = process.env.WEATHER_API_KEY
    let city = req.query.city;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`;

    let weaterAllArr = [];
    superagent.get(url)
        .then(weatherData => {

            weatherData.body.data.map((val, index) => {
                let description = val.weather.description;
                let data = val.datetime;
                var weatherData = new Weather(description, data, city);
                weaterAllArr.push(weatherData);
                // onErorr();

            })
            res.send(weaterAllArr);
        })
});


////////////////////////////////////////////////////////////////////////


function Weather(description, data, city) {
    this.search_query = city;
    this.forecast = description;
    this.time = data;
}

////////////////////////////////////////////////////////////////////////



server.get('/trails', (req, res) => {
    let trailsAllArry=[];
    const key=process.env.TRAIL_API_KEY;
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=200&key=${key}`;
    superagent.get(url)
    .then(data =>{
        data.body.trails.map(element =>{
            const trial = new Trial(element);
            trailsAllArry.push(trial);
        });
        res.send(trailsAllArry);
    });

});

function Trial(data){
    this.name = data.name;
    this.location = data.location;
    this.length = data.length;
    this.stars = data.stars;
    this.starVotes = data.starVotes;
    this.summary = data.summary;
    this.trail_url = data.url;
    this.conditions = data.conditionDetails;
    this.condition_date = data.conditionDate.substring(0,11);
    this.condition_time = data.conditionDate.substring(11);
}

    ///////////////////////////////////////////////////////////////////////
    server.listen(PORT, () => {
        console.log(`listening on PORT ${PORT}`);
    });


    ///////////////////////////////////////////////////////////////////////


    // function onErorr() {

    //     server.use((req, res) => {
    //         res.status(500).send('Sorry, something went wrong')
    //     });

    // }