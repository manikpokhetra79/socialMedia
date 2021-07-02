const Comment = require('../models/comments');
const Post = require('../models/posts');


module.exports.create = async function(req,res){

    try {
        let post = await Post.findById(req.body.post);
        if(post){
            let comment =  await Comment.create({
                content: req.body.content,
                user : req.user._id,
                post : req.body.post
             });

            post.comments.push(comment);
            post.save();
            req.flash('success','Comment published successfully');
            res.redirect('back');
       }       
    } catch (error) {
        req.flash('error','error');
        res.redirect('back');
    }
   
}

module.exports.destroy = async function(req,res){

try {
    let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
        let postId = comment.post;
        comment.remove();
        let post = Post.findByIdAndUpdate(postId,{pull :
             {comment : req.params.id}});
             req.flash('success','Comment deleted successfully');
        return res.redirect('back');
    }else{
        req.flash('error','Error while deleting comments');
        
         return res.redirect('back');
    } 

} catch (error) {
    req.flash('error','Error while deleting comments')
    return;
}
       
}