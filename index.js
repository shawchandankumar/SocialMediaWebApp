const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

// for session-cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const db = require('./config/mongoose');
const app = express();
const port = 8000;

const sassMiddleware = require('node-sass-middleware');
const { customMware } = require('./config/middleware');


// get the post req data in the req.body as json
app.use(express.urlencoded());

app.use(cookieParser());

// include all the css js and images file
app.use(express.static('assets'));

app.use('/uploads', express.static('uploads'));

// use express layouts before router
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// setup view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookies in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment to production environment
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        }, 
        function (err) {
            if (err) {
                console.log('Error in connect mongodb session');
                return;
            }

            return console.log('connected to mongostore to store session cookies in the db');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware);
app.use(passport.setAuthenticatedUser);

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.error(`Error on running server on port ${port}`);
        return;
    }

    console.log(`Server is up and running on port ${port}`);
})

