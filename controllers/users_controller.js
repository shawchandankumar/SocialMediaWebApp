const User = require('../models/user');

module.exports.profile = function (req, res) {

    User.findById(req.params.id, function (err, user) {
        if (err) { console.log('Error in getting user profile ', err); return; }

        return res.render('user_profile', {
            title: 'Profile',
            user_profile: user
        });
    });
}


module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            if (err) { console.log('Error in updating the user information ', err); return; }

            return res.redirect('back');
        });
    } else {
        return res.status(401).send('UnAuthorized');
    }
}

module.exports.signUp = function (req, res) {
    // if the user is not signed in then only show the sign up page 
    if (req.isAuthenticated()) {
        return res.redirect('back');
    }

    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

module.exports.signIn = function (req, res) {
    // if the user is not signed in then only show the sign in page 
    if (req.isAuthenticated()) {
        return res.redirect('back');
    }

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}


// get the sign in data
module.exports.create = function (req, res) {
    if (req.body.confirm_password !== req.body.password) {
        // req.flash('error', 'confir')
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
    req.flash('success', 'Successfully logged in');
    return res.redirect('/');
}


module.exports.destroySession = function (req, res) {
    req.logout((err) => {
        if (err) {console.log('Error in logging out', err); return; }

        req.flash('success', 'You have logged out!!');

        return res.redirect('/');
    })
}

