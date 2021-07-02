const User = require('../models/users');
const Post = require('../models/posts');
//page actions
module.exports.user = function(req,res){
    return res.render('user_login');
}

// lets keep it same as before
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: 'Profile Page',
            profile_user : user
        });
    })
   
}
// action for updating user details
module.exports.update = function(req,res){
    if(req.user._id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            console.log(user);
            return res.redirect('back');
        });
    }else{
        return res.status(401).send("Unauthorized request");
    }

}

module.exports.register = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_register',{
        title: "Register"
    });
}
module.exports.login = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
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
   return res.redirect('/users/login');
}
