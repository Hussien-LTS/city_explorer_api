'use strict'
const superagent = require('superagent');

/////////yelp route


server.get('/yelp', (request, res) => {
    let key = process.env.YELP_API_KEY;
    // let lan =
    // let lon =
    const url = `https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972`;/// need to fix it

    superagent.get(url)
        .then(result => {
            const yelp2 = result.body.results.map((val) => {
                return new allConstrctor.Yelp(val);
            });
            res.status(200).json(yelp2);
        });
})


//// Yelp constrctor 


allConstrctor.Yelp = function (val) {
    this.name = val.name;
    this.url = val.url;
    this.price = val.businesses.price;
    this.rating = val.businesses.rating;
    this.image_url = `http://s3-media4.fl.yelpcdn.com/bphoto/6He-NlZrAv2mDV-yg6jW3g/o.jpg`;//// need to fix it

}