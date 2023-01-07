const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

module.exports.createSession = async function(req, res) {
    console.log('createSession is called');
    try {
        let user = await User.findOne({email: req.body.email});

        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: 'Invalid Username/ Password'
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token please keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: 1000000})
            }
        });

    } catch (err) {
        return res.json(500, {
            messsage: 'Internal server error'
        });
    }
}