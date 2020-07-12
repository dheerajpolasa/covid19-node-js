const mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://localhost/covid');

//acquire the connection
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running
db.once('open', function() {
    console.log('Successfully connected to the database');
});

module.exports = db