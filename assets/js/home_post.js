// method to submit the form data for new post using AJAX 
let createPost = function () {
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function(e) {
        e.preventDefault();

        $.ajax({
            type: 'post', // type of request (get or post)
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function (data) {
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button', newPost));

                // For every new post created by ajax 
                // create every comment of this post by ajax
                createComment($(' .new-comment-form', newPost));
            },
            error: function (error) {
                console.log('error ', error.responseText);
            }
        });
    })
}

// method to display the new post in the dom
let newPostDom = function (post) {
    
    return $(`<li id="post-${post._id}">
            <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
                ${ post.content }
                <br>
                <small> ${ post.user.name } </small>
                <br>
                <div class="post-comments">
                    
                    <form class="new-comment-form" action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Type here to add comment...">
                        <input type="hidden" name="post" value=${post._id}>
                        <input type="submit" value="Add Comment">
                    </form>
            
                    <div id="post-comments-list">
                        <ul id="post-comments-${post._id}">

                        </ul>
                    </div>
                    
                </div>
            </p>
        </li>`
    );
}





let deletePost = function(deleteLink) {
    $(deleteLink).click(function(e) {
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data) {
                $(`#post-${data.data.post_id}`).remove();
            },
            error: function (error) {
                console.log(error.responseText);
            }
        });
    });
}


let attachDeleteListenerToPostsComment = function(post) {

    $(' .delete-comment-button', post).each(function() {
        deleteComment($(this));
    });
}


createPost();

// for the first time when the window loads loop over all the 
// posts and all the comments of every post to attach a click listener 
// for delete when clicked on the cross button
$('#posts-list-container>ul>li').each(function() {
    let curPost = $(this);
    deletePost($(' .delete-post-button', curPost));
    createComment($(' .new-comment-form', curPost));
    attachDeleteListenerToPostsComment(curPost);
});


