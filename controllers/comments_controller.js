const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req,res){
 
    Post.findById(req.body.post,function(err,post){

        if(post){
            Comment.create({
                content: req.body.content,
                user : req.user._id,
                post : req.body.post
            },function(err,comment){
                 //handle error
                 if(err){
                     console.log("error while commenting");
                     return;
                 }
                 //all operations are provided b mongodb
                 post.comments.push(comment);
                 post.save();
                res.redirect('/');
            });
        }
    });
}