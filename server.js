'use strict'

require('dotenv').config();

const express = require('express');

const cors = require('cors');



const PORT = process.env.PORT || 3000

const server = express();

server.use(cors());


client.connect()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Listening on PORT${PORT}`);
        })
    })

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
});

