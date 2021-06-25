const Post = require('../models/posts');

module.exports.create = function(req,res){

    Post.create({
        content: req.body.content,
        user : req.user._id
    },function(err,post){
        if(err){
            console.log("Error while creating post");
            return;
        }
        console.log("post successfully created");
        return res.redirect('back');
    });
}