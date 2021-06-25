const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
//import user model
const User = require('../models/users');
passport.use(new localStrategy({
    usernameField : 'email'
    },   
    function(email,password,done){
        User.findOne({email : email},function(err,user){

            if(err){
                console.log("Error while checking email");
                return done(err);
            }
            if(!user || user.password != password){
                console.log("User not registered || Invalid password");
                return done(null,false);
            }
            return done(null,user);
        });
    }
));


//serializing user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){

    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err);
        }
        done(err, user);
    });
});

//create middlewares
passport.checkAuthentication = function(req,res,next){
    //if user signed in , pass user to next function

    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redirect('/users/login');
    }
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req user contains the current signed in user from session cookie and we are
        // sending this to locals for views

        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;