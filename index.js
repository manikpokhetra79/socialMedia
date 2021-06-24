const express = require('express');
const port = 8000;
const app = express();
app.listen(port,function(err){
    if(err){
        console.log("Error while connecting to Express Server");
        return;
    }
    console.log(`Succesfully connected to Express server at port : ${port}`);
});