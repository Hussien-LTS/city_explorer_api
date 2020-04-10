'use strict'
const superagent = require('superagent');

/////////movies route


function movieshandler (request, res)  {
    let key = process.env.MOVIES_API_KEY;
    const city = request.query.search_query;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city}`;
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzqqqqqqqqqqqqqqqqqqqqqqqqq', key);
    superagent.get(url)
        .then(result => {
            const movie2 = result.body.results.map((val) => {
                return new Movies(val);
            });
            res.status(200).json(movie2);
        });
}


//// Movies constrctor 


function Movies  (val) {
    this.title = val.title;
    this.released_on = val.release_date;
    this.total_votes = val.vote_count;
    this.average_votes = val.vote_average;
    this.popularity = val.popularity;
    this.image_url = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${val.poster_path}`;
    this.overview = val.overview;
}
//// movieshandler export to server.js 

module.exports= movieshandler;
