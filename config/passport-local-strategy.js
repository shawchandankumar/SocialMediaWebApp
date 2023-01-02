const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    
    function (email, password, done) {
        // find a user and establish the identity
        User.findOne({email: email}, function (err, user) {
            if (err) {
                console.log('Error in finding user using passport');
                return done(err);
            }

            if (!user || user.password !== password) {
                console.log('Invalid username / password');
                return done(null, false);
            }

            return done(null, user);
        })
    }

))

// serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id); 
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in deserializing the user');
            return done(err);
        }

        return done(null, user);
    })
});


passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in then pass the request to the next controller action
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not authenticated then 
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function (req, res, next) {
    // req.user contains the current signed in user from the session cookies
    // and we are just setting the user in the locals for the views

    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }

    return next();
}



module.exports = passport;