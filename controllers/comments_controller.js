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

            let postId = comment.id;

            // const postComments = post.comments;
            // const index = postComments.indexOf(comment._id);

            // post.comments.splice(index, 1);
            // post.save();

            comment.remove();
            
            let post = await Post.findByIdAndUpdate(postId, {
                $pull: {
                    comments: req.params.id
                }
            });

            return res.redirect('back');
        }
        else res.redirect('back');

    } catch (err) {
        return console.log('Error: ', err);
    }
    
}