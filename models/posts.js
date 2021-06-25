const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content : {
        type: String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //include array of comment's id in the post schema ( 1 : M relation)
    comments: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
},{
    timestamps: true
});
const Post = mongoose.model('Post',postSchema);
module.exports = Post;