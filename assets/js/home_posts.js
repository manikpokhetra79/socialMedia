{
    //method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            // ajax call using jquery
            $.ajax({
                type: 'post',
                url : '/posts/create',
                data : newPostForm.serialize(), //converts form data to json
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    //to populate deletelink argument in every post
                    deletePost($(' .delete-post-button',newPost)); //we are getting the object
                    // call postcomments class
                    new PostComments(data.data.post._id);
                    
                    new Noty({
                        theme: 'metroui',
                        text: "Dynamic Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in dom
    let newPostDom = function(post){

        return $(`<li id="post-${post._id}">
        <div id="author-details">
            <i class="fa fa-user-circle fa-2x" aria-hidden="true"></i>
            <small>
            ${ post.user.name }
            </small>
            <!-- delete button for posts -->
            <small>
            <a class="delete-post-button" href="posts/destroy/${post._id}">  
            <i class="fas fa-window-close fa-2x"></i>
            </a>
            </small>    
            </div>
            <div class="post-content">
            <p>${post.content}</p>
            </div>
            <div class="post-comments">
                <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                <textarea name="content"  cols="40" rows="4"  placeholder="Type Here to add comment..." required></textarea>
                <input type="hidden" name="post" value="${post._id}" >
                <input type="submit" value="Add Comment">
                 </form>
                 <!-- post comment container -->
            <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
            <h4>Comments</h4>
            </ul>
            <!-- post comment ending -->
            </div>
        </div>
    </li>`)
    }

    // delete posts from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
        
        $.ajax({
            type : 'get',
            url  :  $(deleteLink).prop('href'),
            success : function(data){
                $(`#post-${data.data.post_id}`).remove();
                new Noty({
                    theme: 'metroui',
                    text: " Dynamic Post Deleted!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },
            error: function(err){
                console.log(err.responseText);
            }
        });
        });
        
    }
    // ajax convert to make every  post deletion dynamic by calling above function for every li tag
    let ConvertPostsToAjax = function(e){
        //loop on every post li
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button',self); 
             // populate deletepost function for every post
            deletePost(deleteButton);
             // get the post's id by splitting the id attribute
             //below code to make all comments deletion dynamic
             let postId = self.prop('id').split("-")[1];
             new PostComments(postId);
        });  
    }
    createPost();
    ConvertPostsToAjax();


}