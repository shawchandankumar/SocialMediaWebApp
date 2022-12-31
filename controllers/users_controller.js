const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'Profile'
    });
}


module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}


// get the sign in data
module.exports.create = function (req, res) {
    if (req.body.confirm_password !== req.body.password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            console.log('Error in getting the user in signing up');
            return;
        }

        if (!user) {
            User.create(req.body, function (err, newUser) {
                if (err) {console.log('Error in creating a user while signing up'); return;}

                return res.redirect('/users/sign-in');
            })
        }
        else {
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    /// 
}