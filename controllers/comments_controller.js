const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (err) { console.log('Error in finding Post in which comment is to be add ', err); return; }

        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) { console.log('Error in adding comment ', err); return; }

                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            })
        }
    });
}


module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) { console.log('Error in finding comment to be deleted ', err); return; }

        if (req.user.id == comment.user) {

            let postId = comment.id;

            comment.remove();
            
            Post.findByIdAndUpdate(postId, {
                $pull: {
                    comments: req.params.id
                }
            }, function (err, post) {
                if (err) { console.log('Error in updating post ', err); return; }
                return res.redirect('back');
            })
        }
        else res.redirect('back');
        
    });
}