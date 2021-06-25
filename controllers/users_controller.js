const User = require('../models/users');
//page actions

module.exports.user = function(req,res){
    return res.render('user_login');
}

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'Profile Page'
    });
}

module.exports.register = function(req,res){
    return res.render('user_register',{
        title: "Register"
    });
}
module.exports.login = function(req,res){
    return res.render('user_login',{
        title: "Login"
    });
}

//create user
module.exports.create = function(req,res){

    if(req.body.password != req.body.confirm_password){
        console.log("passwords not same");
        return res.redirect('/users/register');
    }
    User.findOne({email : req.body.email},function(err,user){

        if(err){
            console.log("Error while checking user email");
            return;
        }

        if(!user){
            // not in database
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error while creating user");
                    return;
                }
                console.log("User successfully registered");
                return res.redirect('/users/login');
            });
        }else{
            console.log("User already registered");
            return res.redirect('/users/login');
        }
    });
}

//create session
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

//signout

module.exports.deleteSession = function(req,res){
    req.logout();
    res.redirect('/users/login');
}
