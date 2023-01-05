const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req, res) {

    // Post.find({}, function (err, posts) {
    //     if (err) { console.log('Error in retrieving the post', err); return; }

    //     return res.render('home', {
    //         title: 'Codeial | Home', 
    //         posts
    //     }); 
    // });

    // populate the user of each post
    // Post.find({}).populate('user').exec((err, posts) => {
    //     if (err) { console.log('Error in retrieving posts ', err); return; }

    //     return res.render('home', {
    //         title: 'Codeial | Home', 
    //         posts
    //     })
    // })

    Post.find({})
    .populate('user')
    // populating all the comments in the posts according to the comment id 
    // in the array and inside all the comment populating the user of the comment 
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec((err, posts) => {
        if (err) { console.log('Error in retrieving posts ', err); return; }

        User.find({}, function (err, users) {
            if (err) { console.log('Error in getting all the users/ friends', err); return; }

            return res.render('home', {
                title: 'Codeial | Home', 
                posts,
                users
            })
        })
    });

}