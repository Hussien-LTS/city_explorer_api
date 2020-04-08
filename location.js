'use strict'
const superagent = require('superagent');

/////////loction route

const allConstrctor = require('./constrctors.js')
const client = require('./dataBase.js')


server.get('/location', (req, res) => {
    // const geoData = require('./data/geo.json');
    const city = req.query.city;

    let sql = 'SELECT * FROM locationdata WHERE search_query = $1';
    const safeValue = [city];
    client.query(sql, safeValue)
        .then(datas => {
            if (datas.rowCount > 0) {
                res.send(datas.rows[0])
            } else {
                let key = process.env.LOCATION_API_KEY;
                const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
                superagent.get(url)
                    .then(geoData => {
                        // console.log('wwwwwwwwwwwwwwwwww', geoData)
                        const locationData = new allConstrctor.Location(city, geoData.body);
                        let sql = 'INSERT INTO locationdata (search_query, formatted_query,latitude,longitude) VALUES ($1,$2,$3,$4)'
                        let safeValue = [locationData.search_query, locationData.formatted_query, locationData.latitude, locationData.longitude];
                        client.query(sql, safeValue);
                        res.send(locationData);
                        allHelper.onErorr();
                    });
            }
        })
})

//// Loction constrctor 


allConstrctor.Location = function (city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;

}









