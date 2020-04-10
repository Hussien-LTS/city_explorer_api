'use strict'
const superagent = require('superagent');

/////////trails route


function trailshandler (req, res)  {
    let trailsAllArry = [];

    const key = process.env.TRAIL_API_KEY;
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=200&key=${key}`;
    // console.log('zzzzzzzzzzzzzzzzzzzzzzzzqqqqq555555555555555qqqqqqqq',key);

    superagent.get(url)
        .then(data => {
            data.body.trails.map(element => {
                const trial = new Trial(element);
                trailsAllArry.push(trial);
                // onErorr()
            });
            res.send(trailsAllArry);

        });

}

//// Trail constrctor 


 function Trial (data) {
    this.name = data.name;
    this.location = data.location;
    this.length = data.length;
    this.stars = data.stars;
    this.starVotes = data.starVotes;
    this.summary = data.summary;
    this.trail_url = data.url;
    this.conditions = data.conditionDetails;
    this.condition_date = data.conditionDate.substring(0, 11);
    this.condition_time = data.conditionDate.substring(11);
}

//// trails export to server.js

module.exports = trailshandler;

 //// on error emport to Trails.js 
//  const onErorr = require('./server.js')