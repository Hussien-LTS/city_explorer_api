'use strict'

const allHelper = {}
//// on erro(500) function 
allConstrctor.onErorr = function () {

    server.use((req, res) => {
        res.status(500).send('Sorry, something went wrong')
    });

}

module.exports = allHelper;