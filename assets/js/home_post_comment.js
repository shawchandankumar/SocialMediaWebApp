let createComment = function (commentForm) {
    let newCommentForm = $(commentForm);

    newCommentForm.submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/comments/create',
            data: newCommentForm.serialize(),
            success: function (data) {
                let newComment = newCommentDom(data.data.comment);
                let postCommentsList = $(`#post-comments-${data.data.comment.post}`);
                postCommentsList.prepend(newComment);
                deleteComment($(' .delete-comment-button', newComment));
            },
            error: function (error) {
                console.log(error.responseText);
            }
        })
    });
}


let newCommentDom = function (comment) {

    return $(
        `<li id="comment-${ comment._id }">
            <p>
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">X</a>
                </small>
                ${ comment.content }
                <br>
                <small>${ comment.user.name }</small>
            </p>
        </li>`
    );
}




let deleteComment = function (deleteLink) {

    $(deleteLink).click(function(e) {
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function (data) {
                $(`#comment-${data.data.comment_id}`).remove();
            }, 
            error: function (error) {
                console.log(error.responseText);
            }
        });
    });
}



