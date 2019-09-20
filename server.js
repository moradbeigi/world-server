const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getcurrentYear', ()=> {
    return new Date().getFullYear()
});


app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = fs.appendFile('log.txt', `${now}, ${req.method}, ${req.url}`);
    next();
});


app.get('/', (req, res)=> {
    res.render('home.hbs', {
        titlebar:'basic page',
        welcomMessage:'welcom to this site.!!!!!',
        
    });
});

app.get('/about', (req, res)=> {
    res.render('about.hbs',{
        titlebar:'about page bar',
        
    });
});

app.listen(2000, () => {
    console.log('server run ');
});
