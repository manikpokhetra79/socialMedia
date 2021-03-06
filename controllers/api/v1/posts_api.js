const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')  // to view posts via latest created at
    .populate('user')
    .populate({
        path: 'comments',
        populate : {
            path: 'user'
        }
    })
    res.json({

        message: "List of Posts",
        posts : posts
    });
}

module.exports.destroy = async function(req,res){

    try {
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){

            post.remove();

            await Comment.deleteMany({post : req.params.id});
           
            return res.json(200,{
                message : "Posts and associated Comments deleted"
            });
        }else{
            return res.json(401,{
                message : "You cannot delete this post"
            })
        }
            
    } catch (error) {
       console.log("****",error);
        return res.json(500,{
            message : "Internal Server Error"
        })
    }
    }