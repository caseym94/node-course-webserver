'use strict';
const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
app.use((req, res, next) => {
    var now = new Date().toString(),
        log = `${now}: ${req.method} ${req.url }`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('unable to append to server.log');
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Yo Wadup'
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});