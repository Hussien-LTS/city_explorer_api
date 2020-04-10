'use strict'

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const PORT = process.env.PORT || 3000

const server = express();

server.use(cors());

////////////////////////////////////////////////////
const client = require('./dataBase.js')
client.connect()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Listening on PORT${PORT}`);
        })
    })
////////////////////////////////////////////////////

//// locationhandler Emprot from location.js 

const locationhandler = require('./location.js');
server.get('/location', locationhandler);

////////////////////////////////////////////////////

//// weatherhandler Emprot from Weather.js 

const weatherhandler = require('./Weather.js');
server.get('/weather', weatherhandler);

////////////////////////////////////////////////////

// yelebhandler Emprot from Ylep.js 

const yelphandler = require('./Yelp.js');
server.get('/yelp', yelphandler);

////////////////////////////////////////////////////

//// trailshandler Emprot from Trails.js 

const trailshandler = require('./Trails.js');
server.get('/trails', trailshandler);

////////////////////////////////////////////////////

//// movieshandler Emprot from Movies.js 

const movieshandler = require('./Movies.js');
server.get('/movies', movieshandler);

////////////////////////////////////////////////////
server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
});


/////////////


//// on erro(500) function 
// function onErorr  () {

//     server.use((req, res) => {
//         res.status(500).send('Sorry, something went wrong')
//     });

// }

// module.exports = onErorr;