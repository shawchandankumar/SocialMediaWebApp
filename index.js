const express = require('express');
const app = express();
const port = 8000;

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