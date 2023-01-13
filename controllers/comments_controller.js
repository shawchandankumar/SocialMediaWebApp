const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            await comment.populate([{path: 'user', select: 'name'}])

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment
                    },
                    message: 'Comment created!'
                })
            }

            return res.redirect('back');
        }

    } catch (err) {
        return console.log('Error: ', err);
    }
}


module.exports.destroy = async function (req, res) {
    
    try {
        let comment = await Comment.findById(req.params.id);

        let post = await Post.findById(comment.post);
        
        if (req.user.id == comment.user || req.user.id == post.user) {

            let postId = comment.post;

            // const postComments = post.comments;
            // const index = postComments.indexOf(comment._id);

            // post.comments.splice(index, 1);
            // post.save();

            comment.remove();
            
            // deleting all the comment of this post
            let post = await Post.findByIdAndUpdate(postId, {
                $pull: {
                    comments: req.params.id
                }
            });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: 'Comment deleted'
                })
            }

            return res.redirect('back');
        }
        else res.redirect('back');

    } catch (err) {
        return console.log('Error: ', err);
    }
    
}