const Post = require('../models/posts');
const Comment = require('../models/comments');

// using async await
module.exports.create = async function(req,res){
    try {
        let post =  await Post.create({
            content: req.body.content,
            user : req.user._id
        });
        // check if req is an ajax request
        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : post
                },
                message : "Post created"
            })
        }
        req.flash('success',"Post Published !");
        return res.redirect('back');
    } catch (error) {  
        req.flash('error',"Error");
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){

try {
    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({post : req.params.id});
        req.flash('success',"Post and associated Comments deleted");
        return res.redirect('back');
    }else{
         return res.redirect('back');
}
} catch (error) {
    req.flash('error',"You cannot delete this post");
    return res.redirect('back');
}
}



// old methods

// module.exports.create = function(req,res){

//     Post.create({
//         content: req.body.content,
//         user : req.user._id
//     },function(err,post){
//         if(err){
//             console.log("Error while creating post");
//             return;
//         }
//         console.log("post successfully created");
//         return res.redirect('back');
//     });
// }

// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id,function(err,post){
//         //when we are comparing two ids, mongoose provides a direct way by using .id
//         //.id means converting object id to string
//         if(post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({post : req.params.id},function(err){

//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }