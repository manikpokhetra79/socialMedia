const express = require('express');
const port = 8000;;
const expressLayouts = require('express-ejs-layouts');
const app = express();
//setup express ejs layout
app.use(expressLayouts);
// setup ejs
app.set('view engine' , 'ejs');
app.set('views', './views');
//router
app.use('/',require('./routes/index'));
app.listen(port,function(err){
    if(err){
        console.log("Error while connecting to Express Server");
        return;
    }
    console.log(`Succesfully connected to Express server at port : ${port}`);
});