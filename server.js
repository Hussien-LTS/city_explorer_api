'use strict'

///////////////////////////////////////////////////////////////////////
const express = require('express');

const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3000
 
const server = express();

server.use(cors());



////////////////////////////////////////////////////////////////////////
server.get('/location', (req, res) => {
    const geoData = require('./data/geo.json');
    const city = req.query.city;
    const locationData = new Location(city,geoData);
    res.send(locationData);
    
})

/////////////////////////////////////////////////////////////////////////
function Location (city,geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
    
}

////////////////////////////////////////////////////////////////////////

server.get('/weather', (req,res) =>{
    
    const weatherData = require('./data/weather.json')
    let allArr =[];
    weatherData.data.forEach((val,index) =>{
        let city = req.query.city;
        let description = val.weather.description;
        let data = val.datetime;
        let weatherData2 = new Weather (description, data, city);
        allArr.push(weatherData2);
        onErorr();

    })
    res.send(allArr);
    
});
    
////////////////////////////////////////////////////////////////////////
function Weather (description, data ,city){
    this.search_query = city;
    this.description = description;
    this.datetime = data;
    
    
}

///////////////////////////////////////////////////////////////////////

server.listen(PORT, () =>{
    console.log(`listening on PORT ${PORT}`);
});


///////////////////////////////////////////////////////////////////////

function onErorr(){

        server.use((req, res) => {
            res.status(500).send('Sorry, something went wrong')
});
  
}