
class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`); //refers to the li tag of comment
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }
    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', this.postContainer));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published Dynamically!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }
    newCommentDom(comment){
        return(`
        <li id="comment-${comment._id}">           
            <div class="author-details">
                <i class="fa fa-comments fa-2x" aria-hidden="true"></i>
            <small>
            ${comment.user.name}
            </small>
            <!-- delete button for posts -->
        <small>
            <a class="delete-comment-button" href="comments/destroy/${comment._id}">  
            <i class="fas fa-window-close fa-2x"></i>
        </a>
        </small>
            </div>
            <div class="comment-content">
            <p>
            ${comment.content}
            </p>
            </div>
           
        </li>`);
    }
    // deleteLink is a attribute
    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted Dynamically!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    

}