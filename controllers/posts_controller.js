const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = function (req, res) {
    // if (!req.isAuthenticated()) {
    //     return res.redirect('/sign-in');
    // }

    Post.create({
        content: req.body.content,
        user: req.user.id
    }, function (err, post) {
        if (err) { console.log('Error in creating post ', err); return; }

        return res.redirect('back');
    });
}


module.exports.destroy = function (req, res) {

    Post.findById(req.params.id, function (err, post) {
        if (err) { console.log('Error in finding post to delete', err); return; }

        // .id is a string form of ObjectId (._id)
        if (post && post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({post: req.params.id}, function (err) {
                if (err) { console.log('Error in deleting comments', err); return; }

                return res.redirect('back');
            })
        }
        else {
            return res.redirect('back');
        }
    });
}