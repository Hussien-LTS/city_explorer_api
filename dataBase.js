

const pg = require('pg')

const client = new pg.Client(process.env.DATABAES_URL);


module.exports = client;