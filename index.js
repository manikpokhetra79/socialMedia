const express = require('express');
const port = 8000;;
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const app = express();
const db = require('./config/mongoose');  //look out for database file
// scss setup
app.use(sassMiddleware({
    src :'./assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));
//urlencoded
app.use(express.urlencoded());
//setup express ejs layout
app.use(expressLayouts);
// use static files
app.use(express.static('./assets'));
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