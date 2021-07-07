const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social_media_2_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error while connecting to database"));

db.once('open',function(err){
    if(err){
        console.log('Error in database');
        return;
    }
   console.log("Successfully connected to database :: MongoDb");
})

module.exports = db;