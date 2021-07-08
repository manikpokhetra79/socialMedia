const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtarctJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

// Options 
let opts =  {
    jwtFromRequest : ExtarctJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial',
}

passport.use(new JWTStrategy(opts, function(jwtPayload,done){

    User.findById(jwtPayload._id,function(err,user){

        if(err){
            console.log("Error in finding user from JWT");
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
        // or you could create a new account
    })
}));
module.exports = passport;