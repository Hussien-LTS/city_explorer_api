'use strict'
const superagent = require('superagent');

/////////movies route


server.get('/movies', (request, res) => {
    let key = process.env.MOVIES_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`;
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzqqqqqqqqqqqqqqqqqqqqqqqqq', key);
    superagent.get(url)
        .then(result => {
            const movie2 = result.body.results.map((val) => {
                return new allConstrctor.Movies(val);
            });
            res.status(200).json(movie2);
        });
})


//// Movies constrctor 


allConstrctor.Movies = function (val) {
    this.title = val.title;
    this.released_on = val.release_date;
    this.total_votes = val.vote_count;
    this.average_votes = val.vote_average;
    this.popularity = val.popularity;
    this.image_url = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${val.poster_path}`;
    this.overview = val.overview;
}