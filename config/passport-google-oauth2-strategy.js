const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

/// for random password generator
const crypto = require('crypto');

const User = require('../models/user');

// tell passport to use to google strategy login
passport.use(new googleStrategy({
        clientID: "822850389790-smq7kgenhptidv3jdk8f93fp1mcblkcc.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done) {
        // find the user
        User.findOne({email: profile.emails[0].value}).exec(function(error, user) {
            if (error) {
                console.log('Error on finding the user while google strategy auth passport ', error);
                return;
            }

            if (user) {
                // if found, set this user as req.user
                return done(null, user);
            } else {
                // if not found, create the user and set the user as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value, 
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user) {
                    if (err) { console.log('Error in creating user ', err); return; }
                    
                    return done(null, user);
                })
            }

        });
    }

));



module.exports = passport;
