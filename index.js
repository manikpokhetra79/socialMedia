const express = require('express');
const port = 8000;;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const app = express();
//session cookie and passport authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
//mongoDB
const db = require('./config/mongoose');  //look out for database file
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
// flash message
const flash = require('connect-flash');
const customMware = require('./config/middleware');

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
//cookie parser
app.use(cookieParser());
//setup express ejs layout
app.use(expressLayouts);
// use static files
app.use(express.static('./assets'));
// setup ejs
app.set('view engine' , 'ejs');
app.set('views', './views');

//session
app.use(session({
    name : 'social',
    secret : 'any secret',
    resave : false,
    saveUninitialized : false,
    cookie: {
        maxAge : (1000 * 60 *100),
    } ,
    store:  new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
    function(err){
        console.log(err || 'connect mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
// setup flash message
app.use(flash());
app.use(customMware.setFlash);


// to set details to local.user from req.user
app.use(passport.setAuthenticatedUser);
//router
app.use('/',require('./routes/index'));
app.listen(port,function(err){
    if(err){
        console.log("Error while connecting to Express Server");
        return;
    }
    console.log(`Succesfully connected to Express server at port : ${port}`);
});