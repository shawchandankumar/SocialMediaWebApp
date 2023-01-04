const Post = require('../models/post');

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