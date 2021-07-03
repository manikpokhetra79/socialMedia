{
    //method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url : '/posts/create',
                data : newPostForm.serialize(), //converts form data to json
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    console.log(data);
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
            // ajax ending
        });
    }

    //method to create a post in dom
    let newPostDom = function(post){

        return $(`<li id="post-${post._id}">
        <div id="author-details">
            <i class="fa fa-user-circle fa-2x" aria-hidden="true"></i>
            <small>
            ${ post.user }
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

                <form action="/comments/create" method="POST">
                <textarea name="content"  cols="40" rows="4"  placeholder="Type Here to add comment..." required></textarea>
                <input type="hidden" name="post" value="${post._id}" >
                <input type="submit" value="Add Comment">
                 </form>
      
            <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
            <h4>Comments</h4>
            </ul>
            </div>
        </div>
    </li>`)
    }




    createPost();

}