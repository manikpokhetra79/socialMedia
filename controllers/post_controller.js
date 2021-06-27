const Post = require('../models/posts');
const Comment = require('../models/comments');
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

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        //when we are comparing two ids, mongoose provides a direct way by using .id
        //.id means converting object id to string
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post : req.params.id},function(err){

                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}