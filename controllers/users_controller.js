const User = require('../models/users');
const Post = require('../models/posts');
const fs = require('fs');
const path = require('path');
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
module.exports.update = async function(req,res){
    
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}  
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file){
                    
                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
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
    req.flash('success','You have logged in successfully !');

    return res.redirect('/');
}

//signout

module.exports.deleteSession = function(req,res){
    req.logout();
    req.flash('success','You have logged out successfully !');
   return res.redirect('/users/login');
}
