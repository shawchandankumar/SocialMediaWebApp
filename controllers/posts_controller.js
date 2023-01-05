const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async function (req, res) {
    // if (!req.isAuthenticated()) {
    //     return res.redirect('/sign-in');
    // }

    try {

        let post = Post.create({
            content: req.body.content,
            user: req.user.id
        });

        return res.redirect('back');

    } catch (err) {
        return console.log('Error: ', err);
    }
}


module.exports.destroy = async function (req, res) {

    try {
        
        let post = await Post.findById(req.params.id);

        // .id is a string form of ObjectId (._id)
        if (post && post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }

    } catch (err) {
        return console.log('Error: ', err);
    }
}