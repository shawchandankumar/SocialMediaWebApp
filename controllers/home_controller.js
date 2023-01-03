const Post = require('../models/post');

module.exports.home = function (req, res) {

    // Post.find({}, function (err, posts) {
    //     if (err) { console.log('Error in retrieving the post', err); return; }

    //     return res.render('home', {
    //         title: 'Codeial | Home', 
    //         posts
    //     }); 
    // });

    // populate the user of each post
    Post.find({}).populate('user').exec((err, posts) => {
        if (err) { console.log('Error in retrieving posts ', err); return; }

        return res.render('home', {
            title: 'Codeial | Home', 
            posts
        })
    })

}