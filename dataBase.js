

const pg = require('pg')

const client = new pg.Client(process.env.DATABAES_URL);

//// clint export to (location/server).js 

module.exports = client;