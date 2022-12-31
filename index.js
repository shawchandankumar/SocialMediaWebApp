const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const { urlencoded } = require('express');
const app = express();
const port = 8000;

// get the post req data in the req.body as json
app.use(express.urlencoded());

app.use(cookieParser());

// include all the css js and images file
app.use(express.static('./assets'));

// use express layouts before router
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// setup view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.error(`Error on running server on port ${port}`);
        return;
    }

    console.log(`Server is up and running on port ${port}`);
})