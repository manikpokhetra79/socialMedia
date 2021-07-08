const User = require('../../../models/users');

const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try {
        let user  = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "Invalid Username || password"
            });

        }
        return res.json(200,{
            message: "Sign in Successful",
            data : {
                token : jwt.sign(user.toJSON(),'codeial',{expiresIn : '10000'})
            }
        });

    } catch (error) {
        console.log('*****',error);
        return res.json(500,{
            message : "Internal Server Error"
        })
        
    }


    return res.redirect('/');
}
