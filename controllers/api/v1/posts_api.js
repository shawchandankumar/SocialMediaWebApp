const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = function(req, res) {

    Post.find({}, function (err, posts) {
        
        return res.json(200, {
            message: 'List of Posts',
            posts
        });
    });

}


module.exports.destroy = async function(req, res) {

    try {
        
        let post = await Post.findById(req.params.id);

        // .id is a string form of ObjectId (._id)
        if (post && post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            return res.json(200, {
                message: 'Post and associated comments deleted successfully'
            });
        }
        else {
            return res.json(401, {
                message: 'You cannot delete this post'
            });
        }

    } catch (err) {
        return res.json(500, {
            message: 'Internal server error'
        })
    }

}