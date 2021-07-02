const Post = require('../models/posts');
const User = require('../models/users');

// using async await

module.exports.home = async function(req,res){
try {
    
    let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate : {
            path: 'user'
        }
    })

    let users = await User.find({});
    return res.render('home',{
        title : "MySocial | Home",
        posts : posts,
        all_users : users
});
} catch (error) {
    if(error){
        console.log("Error",err);
        return;
    }
    
}
}















// module.exports.home = function(req,res){
//     Post.find({}).
//     populate('user').
//     populate({
//         path: 'comments',
//         populate  : {
//             path : 'user'
//         }
//     })
//     .exec(function(err,posts){

//         User.find({},function(err,users){
//             return res.render('home',{
//                 title : "MySocial | Home",
//                 posts : posts,
//                 all_users : users
//         });
//     });
// });
// }