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
    let key = process.env.TRAIL_API_KEY
    let id = req.query.id
    console.log('ssssssssssssssssssssssssssssssssssss',id);
    
    // let city = city;
    // let formatted_query = req.query.formatted_query
    // let latitude = req.query.latitude;
    // let longitude = req.query.longitude;

    const url = `https://www.hikingproject.com/data/get-trails-by-id?ids=${id}&key=${key}`;
    // const url = `https://www.hikingproject.com/data/get-trails?${id}&maxDistance=10&key=${key}`
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',url);
    
    let trailsAllArr = [];
    superagent.get(url)
    .then(trailsData =>{
        // console.log('wwwwwwwwwwwwwwwwww', trailsData)

        trailsData.body.data.map((val, index) => {

                let name = val.trails.name;
                let location = val.trails.location;
                let length = val.trails.length;
                let stars = val.trails.stars;
                let star_votes = val.trails.star_votes;
                let summary = val.trails.summary;
                let trail_url = val.trails.url;
                let conditions = val.trails.conditions;
                let condition_date = val.trails.conditionDate;
                let condition_time = val.trails.conditionDate;

                var trailsData = new trails(name, location, length , stars , star_votes , summary , trail_url , conditions,condition_date , condition_time );
                weaterAllArr.push(trailsData);
                // onErorr();

            })
            res.send(trailsAllArr);
        })
});




    ///////////////////////////////////////////////////////////////////////
    function trails(name, location, length , stars , star_votes , summary , trail_url , conditions,condition_date , condition_time) {
        this.name = name;
        this.location = location;
        this.length = length;
        this.stars = stars;
        this.star_votes = star_votes;
        this.summary = summary;
        this.trail_url = trail_url;
        this.conditions = conditions;
        this.condition_date = condition_date;
        this.condition_time = condition_time;
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