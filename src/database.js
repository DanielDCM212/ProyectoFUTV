const mongoose = require('mongoose');

const { mongodb } = require('./keys');

mongoose.connect(mongodb.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( db => console.log('BD conectada'))
    .catch( error => console.error(error));